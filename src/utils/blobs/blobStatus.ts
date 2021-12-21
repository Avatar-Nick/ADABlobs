import { BlobStatus } from "../../types/enum";

export const getBlobStatus = (blob : BlobChainAsset, blobOwnerData: any, blobScriptData: any) => {
    let blobStatus : BlobStatus = BlobStatus.Waiting;
        
    if (blobScriptData) {
        blobStatus = BlobStatus.Sold;
        if (blobOwnerData && blob.asset in blobOwnerData) {
            blobStatus = BlobStatus.Auction;
        }
        else if (blobScriptData && blob.asset in blobScriptData) {
            blobStatus = BlobStatus.Bid;
        }
    }
    return blobStatus
}