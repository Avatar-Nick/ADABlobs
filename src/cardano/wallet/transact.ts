

import { isConnected } from "./connect";

export const transact = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) return;
        if (!isConnected()) return;

        const balance = await cardano.getBalance();
        const decodedBalance = await //cbor.decodeFirst(balance);
        console.log(decodedBalance);

        const utxos = await cardano.getUtxos();
        console.log(utxos);
        console.log(utxos[0]);

        const addresses = await cardano.getUsedAddresses();
        console.log(addresses);
        console.log(addresses[0]);


        return balance;
    }
    catch (error) {
        console.error(error);
        return;
    }    
}