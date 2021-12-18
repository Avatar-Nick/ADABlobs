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
    
    // QUESTION, spacebudz using ex units why dont I?
    const redeemer = Loader.Cardano.Redeemer.new(
        Loader.Cardano.RedeemerTag.new_spend(),
        Loader.Cardano.BigNum.from_str(redeemerIndex),
        redeemerData,
    )

    return redeemer;
}
//--------------------------------------------------------------------------------//