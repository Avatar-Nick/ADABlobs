import { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../public/data/blobs.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => 
{
    try {
        const blobData : { [asset: string]: BlobChainAsset } = data;
        // Use Blobfrost API to get blob script
        // Determine which blobs are in blob script
    
        const scriptBlobs : { [asset: string]: number } = { }

        // TODO Adding assets as an initial test
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6232'] = 1;
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6233'] = 1;
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6234'] = 1;
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6236'] = 1;
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6239'] = 1;
        scriptBlobs['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f62323636'] = 1;
    
        res.status(200).json(scriptBlobs);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

export default handler;