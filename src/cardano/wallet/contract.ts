import Loader from '../loader';

import { fromHex } from '../utils/serialization';
import { contract } from "../plutus/plutus";

export const CONTRACT = () => 
{
    const scripts = Loader.Cardano.PlutusScripts.new();
    scripts.add(Loader.Cardano.PlutusScript.new(fromHex(contract)));
    return scripts;
};

export const CONTRACT_ADDRESS = () => 
{
  return Loader.Cardano.Address.from_bech32(
    "addr1wyzynye0nksztrfzpsulsq7whr3vgh7uvp0gm4p0x42ckkqqq6kxq"
  );
}

//--------------------------------------------------------------------------------//
// Datums
//--------------------------------------------------------------------------------//
export const GIVE = () => 
{
    // The below code creates the following datum json
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
    const datum = Loader.Cardano.PlutusData.new_constr_plutus_data(
        Loader.Cardano.ConstrPlutusData.new(
            Loader.Cardano.Int.new_i32(0),
            fieldsInner
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