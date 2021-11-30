import { isConnected } from "./connect";
import { fromHex, toHex, toBytesNum, fromAscii  } from "../utils/serialization";
import Loader from '../loader';

export const transact = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) return;
        if (!isConnected()) return;

        const balance = await cardano.getBalance();
        //const decodedBalance = fromHex(balance); //cbor.decodeFirst(balance);
        
        const walletAddress = Loader.Cardano.BaseAddress.from_address(
            Loader.Cardano.Address.from_bytes(
              fromHex((await window.cardano.getUsedAddresses())[0])
            )
        );
        console.log(walletAddress);

          
        

        //const utxos = await cardano.getUtxos();
        //console.log(utxos);
        //console.log(utxos[0]);

        //const addresses = await cardano.getUsedAddresses();
        //console.log(addresses);
        //console.log(addresses[0]);


        return balance;
    }
    catch (error) {
        console.error(error);
        return;
    }    
}