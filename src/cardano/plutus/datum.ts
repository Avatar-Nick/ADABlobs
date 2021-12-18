import Loader from '../loader';
import { fromHex } from '../serialization';

//--------------------------------------------------------------------------------//
// Datums
//--------------------------------------------------------------------------------//
export const START_DATUM = (startAuctionDetails: AuctionDetails) => 
{
    // The code below creates this json format    
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
                    "int": 1 // adMarketplacePercent
                },
                {
                    "bytes": 1639241130000 // adMarketplaceAddress
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

    const { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid, adMarketplacePercent, adMarketplaceAddress } = startAuctionDetails;

    // Construct Cardano Json
    const auctionDetailsFields = Loader.Cardano.PlutusList.new();
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adSeller)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adCurrency)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adToken)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adDeadline)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adStartTime)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMinBid)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMarketplacePercent)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adMarketplaceAddress)))
    
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

export const BID_DATUM = (bidAuctionDetails: AuctionDetails, bidBidDetails: BidDetails) => 
{
    // The code below creates this json format    
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
                        "int": 1 // adMarketplacePercent
                    },
                    {
                        "bytes": 1639241130000 // adMarketplaceAddress
                    },
                ]
            },
            {
                "constructor": 1,
                "fields": [
                    {
                        "bytes" : "5e96005ccd0c8ff27ef924bcbf7f3eae0c2e8597b5cc0c3b1cd5edaa" // bdBidder
                    },
                    {
                        "int" : 10000000 // bdBid
                    }
                ]
            }
        ]
    }
    */

    const { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid, adMarketplacePercent, adMarketplaceAddress } = bidAuctionDetails;

    // Construct Cardano Json
    const auctionDetailsFields = Loader.Cardano.PlutusList.new();
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adSeller)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adCurrency)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adToken)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adDeadline)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adStartTime)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMinBid)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(adMarketplacePercent)))
    auctionDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(adMarketplaceAddress)))

    const auctionDetails = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            auctionDetailsFields,
        )
    )

    const { bdBidder, bdBid } = bidBidDetails;

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