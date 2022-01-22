import Loader from "../cardano/loader";
import WalletAPI from '../cardano/wallet/wallet';
import { adablobsAPI, blockfrostAPI } from '../api/api';
import { arrayToBytes, getAssetUtxos, getAuctionDatum } from '../cardano/plutus/utils';
import { BIDDER_ADDRESS_LABEL, DATUM_LABEL, SELLER_ADDRESS_LABEL } from '../cardano/wallet/transact';
import { blockfrostAPIKey } from '../consts/consts';
import { fromHex } from "../cardano/serialization";
import { getTestBidData, getTestCloseData } from "../../public/data/testData";

// ADABlobs Functions
export const fetchAssets = async ({ pageParam = 1 } : any) => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.base(pageParam)}`);
    return response.json();
}

export const fetchAsset = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.blob(asset)}`);
    return response.json();
}

export const fetchOwnedAssets = async () => {
    const address = await WalletAPI.getAddress();
    if (!address) return { }

    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.addresses.base(address)}`);
    return response.json();
}

export const fetchAddressAuctions = async ({ queryKey }: any) => {
    const [_key, address] = queryKey
    if (!address) return { };
    
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.addresses.auctions(address)}`);
    const data = await response.json();    

    let datum = null;
    let sellerAddress = null;
    let bidderAddress = null;

    const outputData : any = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const asset = keys[i];
        const { utxo, metadata } = data[asset];

        const datumArray = metadata.find((m: any) => m.label == DATUM_LABEL).json_metadata[utxo.output_index];
        datum = arrayToBytes(datumArray);
        datum = Loader.Cardano.PlutusData.from_bytes(fromHex(datum));
        datum = getAuctionDatum(datum);
        if (!datum) {
            continue;
        }

        const sellerAddressMetadata = metadata.find((m: any) => m.label == SELLER_ADDRESS_LABEL);
        if (sellerAddressMetadata) {
            sellerAddress = sellerAddressMetadata.json_metadata.address.slice(2);
            sellerAddress = Loader.Cardano.Address.from_bytes(fromHex(sellerAddress)).to_bech32();
        }

        const bidderAddressMetadata = metadata.find((m: any) => m.label == BIDDER_ADDRESS_LABEL);
        if (bidderAddressMetadata) {
            bidderAddress = bidderAddressMetadata.json_metadata.address.slice(2);
            bidderAddress = Loader.Cardano.Address.from_bytes(fromHex(bidderAddress)).to_bech32();
        }            
        outputData[asset] = { datum, sellerAddress, bidderAddress };
    }

    // Testnet Code
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6232'] = getTestBidData();
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6233'] = getTestBidData();
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6234'] = getTestCloseData();
    }

    return outputData;
}

export const fetchScriptAssets = async () => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.script()}`);
    return response.json();
}

// Blockfrost Functions
export const fetchProtocolParameters = async () => 
{
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.epochs.latest.parameters()}`);
    return response.json();
}

export const fetchCurrentSlot = async () => {
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.blocks.latest.base()}`);
    return response.json();
}

export const fetchTxMetadata = async (tx_hash: string) => {
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.txs.metadata(tx_hash)}`);
    return response.json();
}

export const fetchAssetUtxos = async (address: string, asset: string) => 
{
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.addresses.utxos.asset(address, asset)}`);
    return response.json();    
}

export const fetchAssetOwner = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.assets.addresses(asset)}`);
    return response.json();
}

export const fetchAssetAuction = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos?.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");       
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo?.datum) as AuctionDatum;
    return auctionDatum;
}

export const fetchAssetClose = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos?.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");       
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1];
    const sellerAddress = assetUtxo?.sellerAddress?.to_address().to_bech32();
    const bidderAddress = assetUtxo?.bidderAddress?.to_address().to_bech32();
    return { sellerAddress: sellerAddress, bidderAddress: bidderAddress};
}

export const blockfrostAPIRequest = async (endpoint: string, headers? : any, body? : any) =>
{
    const url = `${blockfrostAPI.baseURL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
        project_id: blockfrostAPIKey,
        ...headers,
        "User-Agent": "adablobs",
        },
        method: body ? "POST" : "GET",
        body,
    });
    
    const data = await response.json();
    return data;
}