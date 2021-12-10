import { adablobsAPI, blockfrostAPI } from '../api/api';
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
    console.log('address', address);
    if (!address) return { }

    console.log('here');
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.address(address)}`)
    return response.json();
}

export const fetchScriptAssets = async () => {
    const response = await fetch(`${adablobsAPI.baseURL}${adablobsAPI.endpoints.blobs.script()}`)
    return response.json();
}

// Blockfrost Functions
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