import { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../public/data/blobs.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => 
{
    const { asset } : any = req.query;
    
    const blobData : { [asset: string]: BlobChainAsset } = data;
    res.status(200).json(blobData[asset]);
}

export default handler;