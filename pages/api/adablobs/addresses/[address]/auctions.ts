import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPI } from "../../../../../src/api/api";
import { blockfrostAPIRequest, fetchTxMetadata } from "../../../../../src/api/requests";
import data from '../../../../../public/data/blobs.json';

/*
    Get all auctions for blobs
    1: Get all utxos at script address
    2: If there are blobs at ascript address get the datum from the utxo
    3: Return object where the blob is the key and datum is the value. This will give timer and bid
*/
const handler = async (req : NextApiRequest, res : NextApiResponse) =>
{
    const { address } = req.query
    
    const endpoint = blockfrostAPI.endpoints.addresses.utxos.base(address);
    const utxos = await blockfrostAPIRequest(endpoint);

    const blobData : { [asset: string]: BlobChainAsset } = data;
    const outputData : any = {};
    for (let i = 0 ; i < utxos.length; i++) {
        const utxo: any = utxos[i];
           
        // If the utxo has an asset get the metadata
        let asset = "";
        let hasAsset = false;
        for (let j = 0; j < utxo.amount.length; j++) {
            asset = utxo.amount[j].unit;
            if (isAssetInUtxo(asset, blobData)) {
                hasAsset = true;
                break;
            }
            asset = ""; // return asset to an empty string if it is not in blobData
        }

        if (hasAsset) {
            const metadata = await fetchTxMetadata(utxo.tx_hash);            
            outputData[asset] = { utxo, metadata };
        }
    }

    res.status(200).json(outputData);
}

export default handler;

const isAssetInUtxo = (asset : string, blobData : { [asset: string]: BlobChainAsset }) => {

    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
        // This is the SundaeSwap Mint test token
        return asset === "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54";
    }

    return asset in blobData;
}