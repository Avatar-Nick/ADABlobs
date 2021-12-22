import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPI } from "../../../../../src/api/api";
import { blockfrostAPIRequest } from "../../../../../src/api/requests";

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
    const data = await blockfrostAPIRequest(endpoint);

    console.log(data);
    res.status(200).json(data);

    // Get all auction data at the script address

    // Steps:

    // Get All utxos at script address
    // If there are any blobs at the script address, get datum from datum hash (probably already have it with the datum metadata)
    // Get price / time etc
}

export default handler;