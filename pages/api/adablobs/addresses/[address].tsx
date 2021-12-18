import { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../public/data/blobs.json';
import { blockfrostAPI } from "../../../../src/api/api";
import { blockfrostAPIRequest } from "../../../../src/api/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => 
{    
    // Determine which assets an address owns
    const { address } : any = req.query;

    try {
        const addressData = await blockfrostAPIRequest(blockfrostAPI.endpoints.addresses.base(address))
        if (!addressData || addressData.status_code === 400) {

            // Testnet Code
            if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
                const owned : { [asset: string]: number } = { }
                owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6231'] = 1;
                owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f623134'] = 1;
                owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f62323637'] = 1;
                res.status(200).json(owned);
                return;
            }

            res.status(400).json({ error: "Address Data Not Found" });
            return;
        }
        const addressAssetList = addressData.amount;
        if (!addressAssetList) {
            res.status(400).json({ error: "Address Asset List Is Null" });
            return;
        }
        
        const blobData : { [asset: string]: BlobChainAsset } = data;  
        const owned : { [asset: string]: number } = { }
        for (let i = 0 ; i < addressAssetList.length; i++) {
            if (addressAssetList[i].unit in blobData) {
                owned[addressAssetList[i].unit] = 1;
            }
        }
        
        // TODO Adding assets as an initial test
        owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6231'] = 1;
        owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f623134'] = 1;
        owned['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f62323637'] = 1;
        res.status(200).json(owned);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
    
}

export default handler;