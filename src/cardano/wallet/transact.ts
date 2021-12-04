import { isConnected } from "./connect";
import { fromHex, toHex, toBytesNum, fromAscii  } from "../utils/serialization";
import Loader from '../loader';

import { CONTRACT, GIVE } from "./contract";

export const transact = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) return;
        if (!isConnected()) return;

        //const balance = await cardano.getBalance();
        //const decodedBalance = fromHex(balance); //cbor.decodeFirst(balance);
        await Loader.load();

        //console.log('test');
        const cardanoLoader = Loader.Cardano
        //console.log(cardanoLoader);

        //const baseAddress = Loader.Cardano.BaseAddress;
        //console.log(baseAddress);

        //const address = Loader.Cardano.Address;
        //console.log(address);

        const usedAddresses = await cardano.getUsedAddresses()
        const usedAddress = usedAddresses[0];
        //console.log(usedAddresses);
        //console.log(usedAddress);

        const regularAddress = fromHex(usedAddress);
        //console.log(regularAddress);
        
        const walletAddress = Loader.Cardano.BaseAddress.from_address(
            Loader.Cardano.Address.from_bytes(
              fromHex((await cardano.getUsedAddresses())[0])
            )
        );
        /*
        console.log('wallet');
        console.log(walletAddress);

        //console.log(CONTRACT());
        console.log(Loader.Cardano.PlutusData);
        console.log(Loader.Cardano.ConstrPlutusData);
        console.log(Loader.Cardano.Int);
        console.log(Loader.Cardano.PlutusList);
        */

        GIVE();

        //const utxos = await cardano.getUtxos();
        //console.log(utxos);
        //console.log(utxos[0]);

        //const addresses = await cardano.getUsedAddresses();
        //console.log(addresses);
        //console.log(addresses[0]);


        //return balance;
    }
    catch (error) {
        console.error(error);
        return;
    }    
}