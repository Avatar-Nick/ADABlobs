import { adablobsAPI, blockfrostAPI, clientBlockfrostAPI } from '../api/api';
import { getAddress } from '../cardano/wallet/wallet';
import { blockfrostAPIKey } from '../consts/consts';

// ADABlobs Functions
export const fetchAssets = async ({ pageParam = 1 } : any) => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.base(pageParam)}`)
    return response.json();
}

export const fetchAsset = async ({ queryKey } : any) => {
    const [_key, asset] = queryKey
    if (!asset) return {};

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
    const response = await fetch(`${clientBlockfrostAPI.baseURL}${clientBlockfrostAPI.endpoints.epochs.latest.parameters()}`)
    return response.json();
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