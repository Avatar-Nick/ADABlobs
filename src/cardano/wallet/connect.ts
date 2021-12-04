import Loader from '../loader';
import { fromHex } from '../serialization';

export const connect = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) 
        {
            console.error("Error: window.cardano is null or undefined. You must have a Cardano Wallet Extension (such as Nami) to connect.")
            return;
        }
    
        const walletConnected = await isConnected();
        if (!walletConnected) return false;

        const isEnabled = await cardano.enable();
        return isEnabled;
    }
    catch (error) {
        console.error(error);
        return false;
    }    
}

export const isConnected = async () => 
{
    try {
        if (typeof window === "undefined") return false;

        const cardano = window.cardano;
        if (!cardano) return false;
    
        return await cardano.isEnabled();
    }
    catch (error) {
        console.error(error);
        return false;
    }    
}

export const getBalance = async () => 
{
    if (typeof window === "undefined") return

    const cardano = window.cardano;
    if (!cardano) return;

    const hexBalance = await cardano.getBalance();
    const balance = Loader.Cardano.Value.from_bytes(fromHex(hexBalance));
    console.log('balance', balance);
    const lovelaces = balance.coin().to_str();
    return lovelaces;
}


export const getAddress = async () => 
{
    if (typeof window === "undefined") return

    const cardano = window.cardano;
    if (!cardano) return;

    // cardano.changeAddress can also be used here
    const hexAddresses = await cardano.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const address = addressObject.to_bech32();
    return address;
}