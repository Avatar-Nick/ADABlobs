import { adaToLovelace, lovelaceToAda } from '../consts';
import Loader from '../loader';

import { assetsToValue, fromHex, toHex } from '../serialization';
import { createOutput, finalizeTransaction, initializeTransaction, splitAmount } from '../wallet/transact';
import { getBaseAddress, getUtxos } from '../wallet/wallet';
import { BID_DATUM, START_DATUM } from './datum';
import { BID_REDEEMER, CLOSE_REDEEMER } from './redeemer';
import { getAssetUtxos, getAuctionDatum } from './utils';

export const CONTRACT = () => 
{
    const scripts = Loader.Cardano.PlutusScripts.new();
    scripts.add(Loader.Cardano.PlutusScript.new(fromHex(process.env.NEXT_PUBLIC_HEX_CONTRACT)));
    return scripts;
};

export const CONTRACT_ADDRESS = () => 
{
  return Loader.Cardano.Address.from_bech32(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
}

export const MARKETPLACE_ADDRESS = () => {
    return Loader.Cardano.Address.from_bech32(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
    );
}

//--------------------------------------------------------------------------------//
// Endpoints
//--------------------------------------------------------------------------------//

/*
    Steps:
    1: Get wallet utxos
    2: Create an output sending an NFT asset to the script address
    3: Sign and submit transaction
*/
export const start = async (auctionDetails: AuctionDetails) => 
{
    // Build the auction datum and initialize transaction data
    const datum = START_DATUM(auctionDetails);
    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();

    // Get the connected wallet address and utxos to ensure they have enough ADA and the proper NFT to auction
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();
    
    // The contract receives a blob NFT as an output
    outputs.add(
        createOutput(
            CONTRACT_ADDRESS(),
            assetsToValue([
                {
                    unit: auctionDetails.adCurrency + auctionDetails.adToken,
                    quantity: "1",
                }
            ]),
            {
                index: 0,
                datum: datum,
                metadata: metadata,
                sellerAddress: walletAddress,
            }
        )
    )
    
    datums.add(datum);

    // Set the required transaction signers
    const requiredSigners = Loader.Cardano.Ed25519KeyHashes.new();
    requiredSigners.add(walletAddress.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    // Finish building and submitting the transaction!
    const txHash = await finalizeTransaction({
        txBuilder,
        changeAddress: walletAddress,
        utxos,
        outputs,
        datums,
        metadata,
        scriptUtxo: null,
        action: null,
      });
      return txHash;
}

/*
    Steps:
    1: Get asset utxos
    2: Get wallet utxos
    3: Ensure transaction will be valid by checking bid and auction time
    4: Create an output sending ADA the script address
    5: If there was already a previous bid, create an output to send ADA back to the previous bidder
    6: Sign and submit transaction
*/
export const bid = async (asset: string, bidDetails: BidDetails) => 
{
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset.");     
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const currentValue = assetUtxo.utxo.output().amount();
    const currentBidAmountLovelace = parseInt(currentValue.coin().to_str());    
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo.datum) as AuctionDatum;

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    let newBid = parseInt(bidDetails.bdBid);
    if (newBid < currentBidAmountLovelace || newBid < parseInt(auctionDatum.adAuctionDetails.adMinBid)) {
        throw new Error(`Bid is too low. Must bid at least ${(Math.ceil((currentBidAmountLovelace * lovelaceToAda) * 100) / 100).toFixed(2)}₳`);
    }

    // Need to add the difference between the currentBidAmountLovelace and the old bid to the newBid
    let oldBid = 0;
    if (auctionDatum.adBidDetails) {
        oldBid = parseInt(auctionDatum.adBidDetails?.bdBid)
    }
    newBid += (currentBidAmountLovelace - oldBid);

    // Decrement endDateTime by 15 minutes to account for ttl (time to live)
    const fifteenMinutes = 1000 * 60 * 15;
    const endDateTime = parseInt(auctionDatum.adAuctionDetails.adDeadline);
    const now = Date.now();
    if (now > (endDateTime - fifteenMinutes)) {
        throw new Error("The auction has ended.");
    }

    const bidDatum = BID_DATUM(auctionDatum.adAuctionDetails, bidDetails);
    datums.add(bidDatum);
    outputs.add(
        createOutput(
            CONTRACT_ADDRESS(), 
            assetsToValue([
                { unit: "lovelace", quantity: newBid.toString() },
                { unit: assetUtxo.asset, quantity: "1" },
            ]),
            {
                index: 0,
                datum: bidDatum,                
                metadata: metadata,
                sellerAddress: assetUtxo.sellerAddress,
                bidderAddress: walletAddress,
            }
        )
    );
    
    // Pay back prevoius bidder if they exist
    if (assetUtxo.bidderAddress) {
        outputs.add(
            createOutput(
                assetUtxo.bidderAddress.to_address(),
                Loader.Cardano.Value.new(Loader.Cardano.BigNum.from_str(auctionDatum.adBidDetails?.bdBid))
            )
        );
    }

    const requiredSigners = Loader.Cardano.Ed25519KeyHashes.new();
    requiredSigners.add(walletAddress.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    const txHash = await finalizeTransaction({
        txBuilder,
        changeAddress: walletAddress,
        utxos,
        outputs,
        datums,
        metadata,
        scriptUtxo: assetUtxo.utxo,
        action: (redeemerIndex: any) => BID_REDEEMER(redeemerIndex, bidDetails)
    });
    
    return txHash;
}

/*
    Steps:
    1: Get asset utxos
    2: Get wallet utxos
    3: Ensure transaction will be valid by checking if the auction has ended
    4: Create an output sending the NFT asset to the highest bidder
    5: Create an output sending ADA to the seller and marketplace
    6: Sign and submit transaction
*/
export const close = async (asset: string) => 
{
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset.");      
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const currentValue = assetUtxo.utxo.output().amount();  
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo.datum) as AuctionDatum;

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    // Decrement endDateTime by 15 minutes to account for ttl (time to live)
    const fifteenMinutes = 1000 * 60 * 15;
    const endDateTime = parseInt(auctionDatum.adAuctionDetails.adDeadline);
    const now = Date.now();
    if (now < (endDateTime - fifteenMinutes)) {
        throw new Error("The auction has not ended yet.");
    }

    // If there is a bidder, Send NFT to bidder, ADA to seller, and ADA to marketplace 
    if (auctionDatum.adBidDetails && assetUtxo.sellerAddress && assetUtxo.bidderAddress) {        
        splitAmount(currentValue.coin(), assetUtxo.sellerAddress.to_address(), outputs);
        outputs.add(
            createOutput(
                assetUtxo.bidderAddress.to_address(),                
                assetsToValue([
                    {
                        unit: auctionDatum.adAuctionDetails.adCurrency + auctionDatum.adAuctionDetails.adToken,
                        quantity: "1",
                    }
                ]),
                {
                    index: 0,
                    datum: assetUtxo.datum,
                    metadata: metadata,
                }
            )
        );
    }
    else {
        outputs.add(
            createOutput(
                assetUtxo.sellerAddress.to_address(),                
                assetsToValue([
                    {
                        unit: auctionDatum.adAuctionDetails.adCurrency + auctionDatum.adAuctionDetails.adToken,
                        quantity: "1",
                    }
                ]),
                {
                    index: 0,
                    datum: assetUtxo.datum,
                    metadata: metadata,
                }
            )
        );
    }

    const requiredSigners = Loader.Cardano.Ed25519KeyHashes.new();
    requiredSigners.add(walletAddress.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    const txHash = await finalizeTransaction({
      txBuilder,
      changeAddress: walletAddress,
      utxos,
      outputs,
      datums,
      scriptUtxo: assetUtxo.utxo,
      action: (redeemerIndex: any) => CLOSE_REDEEMER(redeemerIndex),
    });
    return txHash;
}
//--------------------------------------------------------------------------------//
