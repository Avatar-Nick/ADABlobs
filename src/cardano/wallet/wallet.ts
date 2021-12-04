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
    if (typeof window === "undefined") return null;

    const cardano = window.cardano;
    if (!cardano) return null;

    const hexBalance = await cardano.getBalance();
    const balance = Loader.Cardano.Value.from_bytes(fromHex(hexBalance));
    console.log('balance', balance);
    const lovelaces = balance.coin().to_str();
    return lovelaces;
}

// Human readable address output
export const getAddress = async () => 
{
    if (typeof window === "undefined") return null;

    const cardano = window.cardano;
    if (!cardano) return null;

    const hexAddresses = await window.cardano.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const address = addressObject.to_bech32();
    return address;
}

// Transaction readable address
export const getBaseAddress = async () => 
{
    if (typeof window === "undefined") return null;

    const cardano = window.cardano;
    if (!cardano) return null;

    // cardano.changeAddress can also be used here
    const hexAddresses = await cardano.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const baseAddress = Loader.Cardano.BaseAddress.from_address(addressObject);
    return baseAddress;
}

export const getUtxos = async () => 
{
    if (typeof window === "undefined") return;

    const cardano = window.cardano;
    if (!cardano) return;

    const hexUtxos = await cardano.getUtxos();
    const utxos = hexUtxos.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
    return utxos;
}

export const getNetworkId = async () => 
{
    if (typeof window === "undefined") return null;

    const cardano = window.cardano;
    if (!cardano) return null;

    const networkId = await cardano.getNetworkId();
    return networkId;
}
