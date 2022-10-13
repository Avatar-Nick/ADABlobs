import Loader from '../loader';
import { fromHex } from '../serialization';

//--------------------------------------------------------------------------------//
// Redeemers
//--------------------------------------------------------------------------------//
export const BID_REDEEMER = (redeemerIndex: number, bidDetails: BidDetails) => 
{
    // The code below creates this json format    
    /*
    {
        "constructor": 0,
        "fields": [
            {
                "bytes" : "5e96005ccd0c8ff27ef924bcbf7f3eae0c2e8597b5cc0c3b1cd5edaa" // bdBidder
            },
            {
                "int" : 10000000 // bdBid
            }
        ]
    }
    */

    const { bdBidder, bdBid } = bidDetails;

    // Construct Cardano Json
    const bidDetailsFields = Loader.Cardano.PlutusList.new();
    bidDetailsFields.add(Loader.Cardano.PlutusData.new_bytes(fromHex(bdBidder)))
    bidDetailsFields.add(Loader.Cardano.PlutusData.new_integer(Loader.Cardano.BigInt.from_str(bdBid)))
    const redeemerData = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            bidDetailsFields,
        )
    )

    // Need to wrap the a redeemer in another constructor due to the Haskell "Maybe"
    const auctionRedeemerFields = Loader.Cardano.PlutusList.new();
    auctionRedeemerFields.add(redeemerData);
    const auctionRedeemerData = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            auctionRedeemerFields,
        )
    )
    
    const redeemer = Loader.Cardano.Redeemer.new(
        Loader.Cardano.RedeemerTag.new_spend(),
        Loader.Cardano.BigNum.from_str(redeemerIndex),
        auctionRedeemerData,
        Loader.Cardano.ExUnits.new(
            Loader.Cardano.BigNum.from_str("7000000"),
            Loader.Cardano.BigNum.from_str("3000000000")
        ) // ExUnits represents payment for computation (not sure about units, this was copied from SpaceBudz)
    )

    return redeemer;
}

export const CLOSE_REDEEMER = (redeemerIndex: number) => 
{
    // The code below creates this json format    
    /*
    {
        "constructor": 1,
        "fields": [
        ]
    }
    */

    // Construct Cardano Json
    const bigNum = Loader.Cardano.BigNum.from_str("1");
    const closeFields = Loader.Cardano.PlutusList.new();
    const redeemerData = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            bigNum,
            closeFields,
        )
    )
    
    const redeemer = Loader.Cardano.Redeemer.new(
        Loader.Cardano.RedeemerTag.new_spend(),
        Loader.Cardano.BigNum.from_str(redeemerIndex.toString()),
        redeemerData,
        Loader.Cardano.ExUnits.new(
            Loader.Cardano.BigNum.from_str("5000000"),
            Loader.Cardano.BigNum.from_str("2000000000")
        )
    )
    return redeemer;
}
//--------------------------------------------------------------------------------//