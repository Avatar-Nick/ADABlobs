import Loader from '../loader';
import { fetchScriptAssetUtxos, fetchTxMetadata } from "../../api/requests";
import { ADDRESS_LABEL, DATUM_LABEL } from "../wallet/transact";
import { CONTRACT_ADDRESS } from "./contract";
import { assetsToValue, fromHex, toHex } from '../serialization';

// Get's the UTXO associated with a given asset at the script address
/*
    The strategy for this function is to get the utxo at a script
    address for a given asset, and then obtain the relevant datum
    that we place in the metadata for that asset. This strategy
    was initially used in the SpaceBudz contracts.
*/
export const getAssetUtxos = async (asset: string) => {
    const utxos = await fetchScriptAssetUtxos(CONTRACT_ADDRESS().to_bech32(), asset);

    console.log('utxos', utxos);
    const utxosData = utxos.map(async (utxo: any) => {
        const metadata = await fetchTxMetadata(utxo.tx_hash);
        let datum = null;
        let tradeOwnerAddress = null;
        try {
            const datumArray = metadata.find((m: any) => m.label == DATUM_LABEL).json_metadata[utxo.output_index];
            datum = arrayToBytes(datumArray);

            console.log('datum', datum);
            console.log('metadata', metadata);
            const tradeOwnerAddressMetadata = metadata.find((m: any) => m.label == ADDRESS_LABEL);
            if (tradeOwnerAddressMetadata) {
                tradeOwnerAddress = tradeOwnerAddressMetadata.json_metadata.address.slice(2);
                tradeOwnerAddress = Loader.Cardano.Address.from_bytes(fromHex(tradeOwnerAddress));
            }
        }        
        catch (e) {
            throw new Error("Some required metadata entries were not found");
        }

        datum = Loader.Cardano.PlutusData.from_bytes(fromHex(datum));
        if (toHex(Loader.Cardano.hash_plutus_data(datum).to_bytes()) !== utxo.data_hash) {
            throw new Error("Datum hash doesn't match");
        }
            
        utxo = Loader.Cardano.TransactionUnspentOutput.new(
            Loader.Cardano.TransactionInput.new(
                Loader.Cardano.TransactionHash.from_bytes(fromHex(utxo.tx_hash)),
                utxo.output_index,
            ),
            Loader.Cardano.TransactionOutput.new(
                CONTRACT_ADDRESS(), assetsToValue(utxo.amount),
            )
        )
        return { datum, tradeOwnerAddress, utxo, asset }            
    });
    return await Promise.all(utxosData);
}

export const getTradeDetails = (datum: any) => {
    const auctionDetails = datum.as_contr_plutus_data().data().get(0).as_constr_plutus_data().data();
    const bidDetails = datum.as_contr_plutus_data().data().get(1).as_constr_plutus_data().data();

    const tradeOwner = Loader.Cardano.Ed25519KeyHashes.from_bytes(auctionDetails.get(0).as_bytes());
    const assetId = toHex(auctionDetails.get(1).as_bytes());
    const bidAmount = bidDetails.get(1).as_integer.as_u64();
    return { tradeOwner, assetId, bidAmount };
}

export const bytesToArray = (datumHex: string) => {
    const datumList = datumHex.match(/.{1,64}/g);
    return datumList;
}

export const arrayToBytes = (metadataArray: [string]) => {
    let datum = "";
    metadataArray.map(item => {
        datum += item;
    })
    datum = datum.slice(2); // Remove 0x which signifies a hex value
    return datum;
}