import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPI } from "../../../../../src/api/api";
import { blockfrostAPIRequest } from "../../../../../src/api/requests";


// Getting all Utxos at a script address only is currently unused
const handler = async (req : NextApiRequest, res : NextApiResponse) =>
{
    const { address } = req.query
    
    const endpoint = blockfrostAPI.endpoints.addresses.utxos.base(address);
    const data = await blockfrostAPIRequest(endpoint);

    res.status(200).json(data);
}

export default handler;