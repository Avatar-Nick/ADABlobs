import cbor from 'cbor';
import { isConnected } from "./connect";

export const transact = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) return;
        if (!isConnected()) return;

        const balance = await cardano.getBalance();
        const decoded = await cbor.decodeFirst(balance);
        console.log(decoded);
        return balance;
    }
    catch (error) {
        console.error(error);
        return;
    }    
}