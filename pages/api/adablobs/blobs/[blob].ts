import { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../public/data/blobs.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => 
{
    const { blob } : any = req.query;
    
    const blobData : { [blob: string]: BlobChainAsset } = data;
    res.status(200).json(blobData[blob]);
}

export default handler;