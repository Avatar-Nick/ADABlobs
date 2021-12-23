export const getBlobAuctionDatum = (blob : BlobChainAsset, blobScriptData: any) => {
    if (!blob || !blobScriptData || !blob.asset) return null;

    const utxoData = blobScriptData[blob.asset];
    if (!utxoData) return null;
    const datum = utxoData.datum;
    return datum as AuctionDatum;
}