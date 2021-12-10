import Loader from '../loader';
import { fromHex } from '../serialization';

export const connect = async () => 
{
    try {
        const cardano = window.cardano;
        if (!cardano) 
        {
            console.error("Error: window.cardano is null or undefined. You must have a Cardano Wallet Extension (such as Nami) to connect.")
            return;
        }
        
        const walletConnected = await isConnected();
        if (walletConnected) return false;
        
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
        const cardano = window.cardano;
        if (!cardano) return false;
        
        const isEnabled = await cardano.isEnabled();
        return isEnabled
    }
    catch (error) {
        console.error(error);
        return false;
    }    
}

export const getBalance = async () => 
{
    const cardano = window.cardano;
    if (!cardano) return null;

    const walletConnected = await isConnected();
    if (!walletConnected) return null;

    const hexBalance = await cardano.getBalance();
    const balance = Loader.Cardano.Value.from_bytes(fromHex(hexBalance));
    const lovelaces = balance.coin().to_str();
    return lovelaces;
}

// Human readable address output
export const getAddress = async () => 
{
    const cardano = window.cardano;
    if (!cardano) return null;

    const walletConnected = await isConnected();
    if (!walletConnected) return null;

    const hexAddresses = await cardano.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const address = addressObject.to_bech32();
    return address;
}

// Transaction readable address
export const getBaseAddress = async () => 
{
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
    const cardano = window.cardano;
    if (!cardano) return;

    const hexUtxos = await cardano.getUtxos();
    const utxos = hexUtxos.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
    return utxos;
}

export const getNetworkId = async () => 
{
    const cardano = window.cardano;
    if (!cardano) return null;

    const networkId = await cardano.getNetworkId();
    return networkId;
}
