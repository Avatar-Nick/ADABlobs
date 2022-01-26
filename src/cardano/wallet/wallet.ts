import Loader from '../loader';
import { fromHex, toHex } from '../serialization';

class WalletAPI {
    api: any;

    async connect() {
        try {      
            const cardano = window.cardano;
            if (!cardano) 
            {
                console.error("Error: window.cardano is null or undefined. You must have a Cardano Wallet Extension (such as Nami) to connect.")
                return;
            }
            
            // Currently only supporting nami
            this.api = await cardano.nami.enable();
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    async isConnected() {
        try {
            const cardano = window.cardano;
            if (!cardano) return false;

            const isEnabled = await cardano.nami.isEnabled();
            if (isEnabled) {
                await this.connect(); // Ensure this.api is set
            }
            return isEnabled
        }
        catch (error) {
            console.error(error);
            return false;
        }    
    }

    async getBalance() {
        if (!this.api) return null;
    
        const hexBalance = await this.api.getBalance();
        const balance = Loader.Cardano.Value.from_bytes(fromHex(hexBalance));
        const lovelaces = balance.coin().to_str();
        return lovelaces;
    }

    // Human readable address
    async getAddress() {
        if (!this.api) return null;

        // cardano.changeAddress can also be used here
        const hexAddresses = await this.api.getUsedAddresses();
        const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
        const address = addressObject.to_bech32();
        return address;
    }

    // Transaction readable address
    async getBaseAddress() {
        if (!this.api) return null;
        
        // cardano.changeAddress can also be used here
        const hexAddresses = await this.api.getUsedAddresses();
        const addressObject = Loader.Cardano.Address.from_bytes(fromHex(hexAddresses[0]));
        const baseAddress = Loader.Cardano.BaseAddress.from_address(addressObject);
        return baseAddress;
    }

    async getUtxos() {
        if (!this.api) return null;
        
        const hexUtxos = await this.api.getUtxos();
        const utxos = hexUtxos.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
        return utxos;
    }

    async getCollateral() {
        if (!this.api) return null;
    
        const hexCollateral = await this.api.experimental.getCollateral();
        const collateral = hexCollateral.map((utxo: any) => Loader.Cardano.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
        return collateral;
    }

    async getNetworkId() {
        if (!this.api) return null;

        const networkId = await this.api.getNetworkId();
        return networkId;
    }

    async signTx(tx: any) {
        if (!this.api) return null;
    
        const txVKeyWitnesses = await this.api.signTx(toHex(tx.to_bytes()), true);
        return txVKeyWitnesses;
    }

    async submitTx(signedTx: any) {
        try {
            if (!this.api) return null;
        
            const txHash = await this.api.submitTx(toHex(signedTx.to_bytes()));
            return txHash;
        }
        catch (error: any) {
            console.error(error);
            throw new Error("Transaction Submit Error. The Blob UTXO might be used until the next block (20 seconds), the bid might be too low, or if you are using a hardware wallet it might not be supported. Ensure all data is correct, refresh the page, check the guide, or reach out to our discord channel if the problem persists.");
        }
    }
}

export default new WalletAPI();