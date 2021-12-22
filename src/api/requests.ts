import { adablobsAPI, blockfrostAPI } from '../api/api';
import { getAssetUtxos, getAuctionDatum } from '../cardano/plutus/utils';
import { getAddress } from '../cardano/wallet/wallet';
import { blockfrostAPIKey } from '../consts/consts';

// ADABlobs Functions
export const fetchAssets = async ({ pageParam = 1 } : any) => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.base(pageParam)}`)
    return response.json();
}

export const fetchAsset = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.blob(asset)}`)
    return response.json();
}

export const fetchOwnedAssets = async () => {
    const address = await getAddress();
    if (!address) return { }

    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.address(address)}`)
    return response.json();
}

export const fetchScriptAssets = async () => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.script()}`)
    return response.json();
}

// Blockfrost Functions
export const fetchProtocolParameters = async () => 
{    
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.epochs.latest.parameters()}`)
    return response.json();
}

export const fetchCurrentSlot = async () => {
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.blocks.latest.base()}`)
    return response.json();
}

export const fetchTxMetadata = async (tx_hash: string) => {
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.txs.metadata(tx_hash)}`)
    return response.json();
}

export const fetchAssetUtxos = async (address: string, asset: string) => 
{
    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.addresses.utxos(address, asset)}`)
    return response.json();
}

export const fetchAssetOwner = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const response = await fetch(`${blockfrostAPI.clientURL}${blockfrostAPI.clientEndpoints.assets.addresses(asset)}`)
    return response.json();
}

export const fetchAssetAuction = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");       
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1]; 
    const auctionDatum: AuctionDatum = getAuctionDatum(assetUtxo.datum);
    return auctionDatum;
}

export const fetchAssetClose = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return { };

    const assetUtxos = await getAssetUtxos(asset);
    if (assetUtxos.length > 1) {
        throw new Error("There can only be 1 utxo for an NFT asset");       
    }

    const assetUtxo: any = assetUtxos[assetUtxos.length - 1];
    const sellerAddress = assetUtxo.sellerAddress.to_address().to_bech32();
    const bidderAddress = assetUtxo.sellerAddress.to_address().to_bech32();
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