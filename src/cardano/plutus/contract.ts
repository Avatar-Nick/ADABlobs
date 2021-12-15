import { marketplaceAddress } from '../consts';
import Loader from '../loader';

import { assetsToValue, fromHex } from '../serialization';
import { createOutput, finalizeTransaction, initializeTransaction, splitAmount } from '../wallet/transact';
import { getBaseAddress, getUtxos } from '../wallet/wallet';
import { getAssetUtxos, getTradeDetails } from './utils';

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
// Datums
//--------------------------------------------------------------------------------//
export const START = (startAuctionDetails: AuctionDetails) => 
{
    // Code below creates this json format    
    /*
    {
        "constructor": 0,
        "fields": [
            {
            "constructor": 0, // AuctionDetails
            "fields": [
                {
                    "bytes": "67614c1b06ddbb100cb6cbe919594cac31771c25530b6c7f28da242b" // adSeller
                },
                {
                    "bytes": "d6cfdbedd242056674c0e51ead01785497e3a48afbbb146dc72ee1e2" // adCurrency
                },
                {
                    "bytes": "123456" // adToken
                },
                {
                    "int": 1639241530000 // adDealine
                },
                {
                    "int": 1639241130000 // adStartTime
                },
                {
                    "int": 1 // adMarketplacePercent
                },
                {
                    "bytes": 1639241130000 // adMarketplaceAddress
                },
                {
                    "int": 8000000 // adMinBid
                },
            ]
            },
            {
                "constructor": 1,
                "fields": [
                ]
            }
        ]
    }
    */

    const { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid } = startAuctionDetails;

    // Construct Cardano Jason
    const auctionDetailsFields = Loader.Cardano.PlutusList.new();
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adSeller)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adCurrency)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adToken)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adDeadline)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adStartTime)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adStartTime)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMinBid)))

    const auctionDetails = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            auctionDetailsFields,
        )
    )

    const bidDetailsFields = Loader.Cardano.PlutusList.new();
    const bidDetails = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(1),
            bidDetailsFields,
        )
    )

    const datumFields = Loader.Cardano.PlutusList.new();
    datumFields.add(auctionDetails);
    datumFields.add(bidDetails);

    const datum = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            datumFields,
        )
    )
    
    return datum;
}

export const BID = (bidAuctionDetails: AuctionDetails, bidBidDetails: BidDetails) => {
    // Code below creates this json format    
    /*
    {
        "constructor": 0,
        "fields": [
            {
                "constructor": 0, // AuctionDetails
                "fields": [
                    {
                    "bytes": "67614c1b06ddbb100cb6cbe919594cac31771c25530b6c7f28da242b" // adSeller
                    },
                    {
                    "bytes": "d6cfdbedd242056674c0e51ead01785497e3a48afbbb146dc72ee1e2" // adCurrency
                    },
                    {
                    "bytes": "123456" // adToken
                    },
                    {
                    "int": 1639241530000 // adDealine
                    },
                    {
                    "int": 1639241130000 // adStartTime
                    },
                    {
                    "int": 8000000 // adMinBid
                    },
                    {
                    "map": [ // adPayoutPercentages
                        {
                            "v": {
                                "int": 990
                            },
                            "k": {
                                "bytes": "67614c1b06ddbb100cb6cbe919594cac31771c25530b6c7f28da242b" // adSeller PubKeyHash
                            }
                        },
                        {
                            "v": {
                                "int": 10
                            },
                            "k": {
                                "bytes": "1d0ab2689eed633f013b347ba5db41919367dfc86d0d74d0a809c3e0" // marketplace PubKeyHash (Mine)
                            }
                        }
                    ]
                    }
                ]
            },
            {
                "constructor": 1,
                "fields": [
                    {
                        "bytes" : "5e96005ccd0c8ff27ef924bcbf7f3eae0c2e8597b5cc0c3b1cd5edaa"
                    },
                    {
                        "int" : 10000000
                    }
                ]
            }
        ]
    }
    */

    const { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid } = bidAuctionDetails;

    // Data
    const adPayoutPercentages = Loader.Cardano.PlutusMap.new();
    adPayoutPercentages.insert(Loader.Cardano.PlutusData.new_bytes(fromHex(adSeller)), Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str("990")));
    adPayoutPercentages.insert(Loader.Cardano.PlutusData.new_bytes(fromHex(marketplaceAddress)), Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str("10")));

    // Construct Cardano Jason
    const auctionDetailsFields = Loader.Cardano.PlutusList.new();
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adSeller)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adCurrency)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adToken)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adDeadline)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adStartTime)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMinBid)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_map(adPayoutPercentages));

    const auctionDetails = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            auctionDetailsFields,
        )
    )

    const { bdBidder, bdBid} = bidBidDetails;

    // TODO This was changed from the json in the tests, constr is now (1) etc. Is that okay?
    const bidDetailsFields = Loader.Cardano.PlutusList.new();
    bidDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(bdBidder)))
    bidDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(bdBid)))
    const bidDetails = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(1),
            bidDetailsFields,
        )
    )

    const datumFields = Loader.Cardano.PlutusList.new();
    datumFields.add(auctionDetails);
    datumFields.add(bidDetails);

    const datum = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            datumFields,
        )
    )
    
    return datum;
}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
// Redeemers
//--------------------------------------------------------------------------------//
const GRAB = () => 
{
    // The below code creates the following redeemer json
    /*
    {
        "constructor": 0,
        "fields":
        [
            {
                "int": 7
            }
        ]
    }
    */

    const fieldsInner = Loader.Cardano.PlutusList.new();
    fieldsInner.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str("7")));
    const redeemer = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            fieldsInner
        )
    )
    return redeemer;
}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
// Endpoints
//--------------------------------------------------------------------------------//

/*
    Steps:
    1: Get wallet utxos
    2: Create an output sending an NFT asset to the script address
    3: Sign and submit transaction
*/

export const start = async (auctionDetails: AuctionDetails) => {

    const datum = START(auctionDetails);

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();
    
    // Contract receives blob
    outputs.add(
        createOutput(
            CONTRACT_ADDRESS(),
            assetsToValue([
                {
                    unit: auctionDetails.adCurrency + auctionDetails.adToken, // TODO: Is this correct?
                    quantity: "1",
                }
            ]),
            {
                datum: datum,
                index: 0,
                metadata: metadata, // TODO should I have the datum value here as well?
            }
        )
    )
    datums.add(datum);

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
        scriptUtxo: null,
        action: null, // REDEEMERS HERE TODO (Need start redeemer?)
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
export const bid = async (asset: string, bidDetails: BidDetails) => {
    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");
    }
    const assetUtxo: any = assetUtxos[0];
    const currentBidAmount = assetUtxo.utxo.output().amount(); // TODO Will this throw an error if no current Bid?
    const auctionDetails: AuctionDetails = assetUtxo.datum.auctionDetails;    

    const { txBuilder, datums, metadata, outputs } = await initializeTransaction();
    const walletAddress = await getBaseAddress();
    const utxos = await getUtxos();

    datums.add(assetUtxo.datum);

    if (bidDetails.bdBid < currentBidAmount || bidDetails.bdBid < parseInt(auctionDetails.adMinBid)) {
        throw new Error("Bid is too low");
    }

    // TODO: Check time here as well?

    const bidDatum = BID(auctionDetails, bidDetails);
    datums.add(bidDatum);
    outputs.add(
        createOutput(
            CONTRACT_ADDRESS(), 
            assetsToValue([
                { unit: "lovelace", quantity: bidDetails.bdBid},
                { unit: assetUtxo.asset, quantity: "1"},
            ]),
            {
                datum: bidDatum,
                index: 0, // TODO: is this the txix?
                tradeOwnerAddress: walletAddress,
                metadata: metadata,
            }))

    // Check if bidder is owner of utxo. if so, not necessary to pay back to you own address
    // TODO: I'm not sure if the spacebudz comment is the entire story, because shouldnt you pay the
    // difference of your previous bid and the current bid?
    // Temporarily Commented out
    
    /*
    if (assetUtxo.tradeOwnerAddress.to_bech32() != walletAddress.to_address().to_bech32()){

    }
    */
        
    outputs.add(
        createOutput(
            assetUtxo.tradeOwnerAddress,
            Loader.Cardano.Value.new(currentBidAmount.coin())
        )
    );

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
        action: null,
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
