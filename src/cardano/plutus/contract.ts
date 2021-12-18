import { env } from 'process';
import Loader from '../loader';

import { assetsToValue, fromHex, toHex } from '../serialization';
import { createOutput, finalizeTransaction, initializeTransaction, splitAmount } from '../wallet/transact';
import { getBaseAddress, getUtxos } from '../wallet/wallet';
import { BID_DATUM, START_DATUM } from './datum';
import { BID_REDEEMER } from './redeemer';
import { getAssetUtxos, getAuctionDatum, getValueLength } from './utils';

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
                datum: datum,
                index: 0,
                metadata: metadata,
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

    const { txBuilder, datums, redeemers, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    const newBid = parseInt(bidDetails.bdBid);
    if (newBid < currentBidAmountLovelace || newBid < parseInt(auctionDatum.adAuctionDetails.adMinBid)) {
        throw new Error("Bid is too low");
    }

    // Question: Check time here as well?

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
                datum: bidDatum,
                index: 0, // QUESTION: is this the txix?
                tradeOwnerAddress: walletAddress,
                metadata: metadata,
            }
        )
    );
    
    // Pay back prevoius bidder if they exist
    if (assetUtxo.tradeOwnerAddress) {
        outputs.add(
            createOutput(
                assetUtxo.tradeOwnerAddress,
                Loader.Cardano.Value.new(currentValue.coin())
            )
        );
    }

    // Add Redeemers
    const redeemerIndex = txBuilder.index_of_input(assetUtxo.utxo.input()).toString();
    redeemers.add(BID_REDEEMER(redeemerIndex, bidDetails))

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
        scriptUtxo: assetUtxo.utxo,
      });

    return txHash;
}

/*
    Steps:
    1: Get wallet utxos
    2: Get asset utxo that is on the script address
    3: Create an output sending a blob NFT to the script address
    3: Sign and submit transaction

    TODO: I need to fill this out
*/
export const close = async (asset: string) => {
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");
    }
    const assetUtxo: any = assetUtxos[0];
    const currentBidAmount = assetUtxo.utxo.output().amount(); // TODO Will this throw an error if no current Bid?
    const auctionDetails: AuctionDetails = assetUtxo.datum.auctionDetails; 
    const bidDetails: BidDetails = assetUtxo.datum.bidDetails;

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    // Send NFT to bidder and ADA to seller
    splitAmount(currentBidAmount, auctionDetails.adSeller, outputs);
    outputs.add(createOutput(bidDetails.bdBidder, assetUtxo.utxo.output().amount())); // bidder probably needs type conversion // buyer receiving SpaceBud

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
      action: null,
    });
    return txHash;
}
//--------------------------------------------------------------------------------//
