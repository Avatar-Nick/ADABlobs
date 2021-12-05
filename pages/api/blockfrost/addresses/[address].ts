import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPIRequest } from "../../../../src/api/requests";
import data from "../../../../public/data/blobs.json";

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
    // I need to find out how much ADA you have (done)
    // I need to find out if you have an ADA Blob
    
    // Blob Data
    // I need to find ipfs of all blobs
    // I need to calculate which blobs to reveal (probably by date)
    // I need to find which blobs are in a script (show bid button and ADA)

    // assets/policy/{policyid}
    //4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318
    
    /*
    const dataSet: any[] = [];

    const pageCount = 4;
    for (let page = 1; page <= pageCount; page++) {
        const endpoint = `/assets/policy/4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318?page=${page}`
        const data = await blockfrostAPIRequest(endpoint);

        data.forEach((item : any) => {
            if (parseInt(item.quantity) > 0)
            dataSet.push(item);
        })
    }
    console.log(dataSet.length);
    console.log(dataSet);

    
    const assetList = [];
    for (let i = 0; i < dataSet.length; i++) 
    {
        const endpoint2 = `/assets/${dataSet[i].asset}`
        const data2 : BlobChainAsset = await blockfrostAPIRequest(endpoint2);
        assetList.push(data2);
    }

    assetList.sort((a, b) => {
        if (a.onchain_metadata.id > b.onchain_metadata.id) {
            return -1;
        }

        if (b.onchain_metadata.id > a.onchain_metadata.id) {
            return 1;
        }
        return 0;
    })

    
    const finalData: { [asset: string]: BlobChainAsset } = {}; 
    for (let i = 0 ; i < assetList.length; i++) {
        finalData[assetList[i].asset] = assetList[i];
    }

    */
    /*
    const endpoint = `/assets/policy/4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318?page=${1}`
    const data = await blockfrostAPIRequest(endpoint);
    


    const endpoint2 = "/assets/4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6231"
    const data2 = await blockfrostAPIRequest(endpoint2);
    console.log(data2);

    const endpoint3 = "/assets/4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6231"
    const data3 = await blockfrostAPIRequest(endpoint3);
    console.log(data2);
    */
    
    //https://ipfs.blockfrost.io/api/v0

    /*
    const data = await blockfrostRequest(endpoint);
    console.log(data);
    console.log(data.length);
    */
    //console.log(data);
    res.status(200).json(data);
    
}

export default handler;