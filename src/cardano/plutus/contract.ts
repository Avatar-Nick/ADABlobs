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
    const datum = START_DATUM(auctionDetails);
    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();

    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();
    
    // Contract receives blob
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

    const redeemers = null;

    const requiredSigners = Loader.Cardano.Ed25519KeyHashes.new();
    requiredSigners.add(walletAddress.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    const txHash = await finalizeTransaction({
        txBuilder,
        changeAddress: walletAddress,
        utxos,
        outputs,
        datums,
        redeemers,
        metadata,
        scriptUtxo: null,
      });
      return txHash;
}

export const bid = async (asset: string, bidDetails: BidDetails) => 
{
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
            throw new Error("There can only be 1 utxo for an NFT asset");
        }        
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const currentValue = assetUtxo.utxo.output().amount();
    const currentBidAmountLovelace = currentValue.coin().to_str();    
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo.datum);

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    //30ca3887e827864907adf13322ea12c87d17e2ef0bea8601bb52f077

    // BaseAddress, Address

    datums.add(assetUtxo.datum);

    const newBid = parseInt(bidDetails.bdBid);
    if (newBid < currentBidAmountLovelace || newBid < parseInt(auctionDatum.adAuctionDetails.adMinBid)) {
        throw new Error("Bid is too low");
    }

    // Question: Check time here as well?    
    console.log(assetUtxo);

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
                assetUtxo.bidderAddress,
                Loader.Cardano.Value.new(currentValue.coin())
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

export const close = async (asset: string) => 
{
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
            throw new Error("There can only be 1 utxo for an NFT asset");
        }        
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const currentValue = assetUtxo.utxo.output().amount();
    const currentBidAmountLovelace = currentValue.coin().to_str();    
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo.datum);

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    // Question: Check time here as well?

    // If there is a bidder, Send NFT to bidder, ADA to seller, and ADA to marketplace 
    if (auctionDatum.adBidDetails && assetUtxo.bidderAddress) {        
        splitAmount(currentBidAmountLovelace, auctionDatum.adAuctionDetails.adSeller, outputs);
        outputs.add(
            createOutput(
                assetUtxo.bidderAddress,                
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
                assetUtxo.sellerAddress,                
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

    // QUESTION, could there be an issue with the change address being a wallet address?
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
