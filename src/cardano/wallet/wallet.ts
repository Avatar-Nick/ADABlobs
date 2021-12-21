import Loader from '../loader';
import { fromHex, toHex } from '../serialization';

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

    // cardano.changeAddress can also be used here
    const hexAddresses = await cardano.getUsedAddresses();
    const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
    const address = addressObject.to_bech32();
    return address;
}

// Transaction readable address
export const getBaseAddress = async () => 
{
    try {
        const cardano = window.cardano;
        if (!cardano) return null;
    
        // cardano.changeAddress can also be used here
        const hexAddresses = await cardano.getUsedAddresses();
        const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
        const baseAddress = Loader.Cardano.BaseAddress.from_address(addressObject);
        return baseAddress;
    }
    catch (error) {
        console.error(error);
        throw new Error("Unable to get wallet address. Ensure your Cardano wallet is connected.");
    } 
}

export const getBaseAddressFromAddressString = async (addressBech32: string) => {
    const cardano = window.cardano;
    if (!cardano) return null;

    const addressObject = Loader.Cardano.Address.from_bech32(addressBech32);
    const baseAddress = Loader.Cardano.BaseAddress.from_address(addressObject);
    return baseAddress;
}

export const getUtxos = async () => 
{
    try {
        const cardano = window.cardano;
        if (!cardano) return;
    
        const hexUtxos = await cardano.getUtxos();
        const utxos = hexUtxos.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
        return utxos;
    }
    catch (error) {
        console.error(error);
        throw new Error("Unable to get Utxos. Ensure your Cardano wallet is connected.");
    }
}

export const getCollateral = async () => {
    const cardano = window.cardano;
    if (!cardano) return;

    const hexCollateral = await cardano.getCollateral();
    const collateral = hexCollateral.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
    return collateral;
}

export const getNetworkId = async () => 
{
    const cardano = window.cardano;
    if (!cardano) return null;

    const networkId = await cardano.getNetworkId();
    return networkId;
}

export const signTx = async (tx: any) => {
    const cardano = window.cardano;
    if (!cardano) return null;

    const txVKeyWitnesses = await cardano.signTx(toHex(tx.to_bytes()), true);
    return txVKeyWitnesses;
}

export const submitTx = async (signedTx: any) => {
    const cardano = window.cardano;
    if (!cardano) return null;

    const txHash = await cardano.submitTx(toHex(signedTx.to_bytes()));
    return txHash;
}
