import { BlobStatus } from "../../types/enum";

export const getBlobStatus = (blob : BlobChainAsset, blobOwnerData: any, blobScriptData: any) => {
    let blobStatus : BlobStatus = BlobStatus.Waiting;
    if (blobOwnerData && blobScriptData) {
        blobStatus = BlobStatus.Sold;
        if (blob.asset in blobOwnerData) {
            blobStatus = BlobStatus.Auction;
        }
        else if (blob.asset in blobScriptData) {
            blobStatus = BlobStatus.Bid;
        }
    }
    return blobStatus
}