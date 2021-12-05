import { NextApiRequest, NextApiResponse } from "next";
import data from '../../../public/data/blobs.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => 
{
    const page: number = parseInt(req.query.page as string) || 1;
    const count: number = parseInt(req.query.count as string) || 30;
    const start = 0;
    //const start = (page - 1) * count;
    const end = page * count;
    try 
    {
        const blobList : BlobChainAsset[] = Object.values(data);
        const blobs = blobList.slice(start, end);
        const responseData = {
            blobs: blobs,
            curPage: page,
            maxPage: Math.ceil(blobList.length / count),
        }
        res.status(200).json(responseData);        
    }
    catch (error) 
    {
        res.status(400).json({});
    }
}

export default handler;