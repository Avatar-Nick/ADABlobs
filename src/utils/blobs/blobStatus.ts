import { BlobStatus } from "../../types/enum";

export const getBlobStatus = (blob : BlobChainAsset, blobOwnerData: any, blobScriptData: any) => {
    let blobStatus : BlobStatus = BlobStatus.Loading;
       
    if (blobOwnerData && blob.asset in blobOwnerData) {
        blobStatus = BlobStatus.Auction;
    }
    else if (blobScriptData && blob.asset in blobScriptData && hasAuctionEnded(blobScriptData[blob.asset])) {
        blobStatus = BlobStatus.Close;
    }
    else if (blobScriptData && blob.asset in blobScriptData) {
        blobStatus = BlobStatus.Bid;
    }
    else if (blobOwnerData && blobScriptData) {
        blobStatus = BlobStatus.Sold;
    }
    return blobStatus
}

const hasAuctionEnded = (data: any) => {
    const now = Date.now();
    const endDatetime = data?.datum?.adAuctionDetails?.adDeadline;
    if (!endDatetime) return false; 

    const ended = now > parseInt(endDatetime);
    return ended;
}