import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPI } from '../../../../src/api/api';
import { blockfrostRequest } from "../../../../src/api/requests";

const handler = async (req : NextApiRequest, res : NextApiResponse) =>
{
    //const { address } = req.query
    //const address = 'addr1q825x5678w6elkkrn8paxv4m4h92lv4x37yd6p0klku5s62z2ht8hx6s62gpxnjhwpjhxh9srzv7mzdtlf3kttzvmf3qnd0v7f';
    
    //const address = 'addr1q9kfu5d3vcvrup03xjy2kthq3c6l800rz70y6tprxk0l806z2ht8hx6s62gpxnjhwpjhxh9srzv7mzdtlf3kttzvmf3qfe2ym0';
    // const endpoint = blockfrostAPI.endpoints.address(address);
    //console.log(endpoint);
    //console.log(blockfrostAPI.baseURL);
    
    //const endpoint = '/accounts/stake1u8a8kcx9s6vzara6g7zxxfz8mfkhf0g0c2yy8t2k7h9n4eg8pvpyp';    
    
    // Need pagination for below
    //const endpoint = '/accounts/stake1u8a8kcx9s6vzara6g7zxxfz8mfkhf0g0c2yy8t2k7h9n4eg8pvpyp/addresses/assets'

    // Account Data
    // I need to find out how much ADA you have
    // I need to find out if you have an ADA Blob
    
    // Blob Data
    // I need to find ipfs of all blobs
    // I need to calculate which blobs to reveal (probably by date)
    // I need to find which blobs are in a script (show bid button and ADA)

    const data = await blockfrostRequest(endpoint);
    console.log(data);
    console.log(data.length);
    res.status(200).json(data);
}

export default handler;