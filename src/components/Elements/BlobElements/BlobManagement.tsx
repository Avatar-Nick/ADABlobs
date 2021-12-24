import { AuctionSection } from "../TradeElements/AuctionSection";
import { BidSection } from "../TradeElements/BidSection";
import { useAssetOwner, useOwnedAssets, useAddressAuctions } from "../../../hooks/assets.hooks";
import { getBlobStatus } from "../../../utils/blobs/blobStatus";
import { BlobStatus } from "../../../types/enum";
import { useState } from "react";
import { timeout } from "../../../utils/time";
import { CloseSection } from "../TradeElements/CloseSection";

export const BlobManagement = ({ blob } : { blob : BlobChainAsset}) => 
{
    const [copy, setCopy] = useState(false);

    const ownedAssetsQuery = useOwnedAssets();
    const addressAuctionsQuery = useAddressAuctions(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string);
    const assetOwnerQuery = useAssetOwner(blob.asset);

    const copyAddress = async () => {
        if (!assetOwnerQuery?.data?.[0]?.address) return;
        const address = assetOwnerQuery?.data?.[0].address;

        setCopy(true);
        const clipboard = navigator.clipboard;
        await clipboard.writeText(address);

        const milliseconds = 500;
        await timeout(milliseconds)
        setCopy(false);
    }

    const blobStatus: BlobStatus = getBlobStatus(blob, ownedAssetsQuery.data, addressAuctionsQuery.data) as BlobStatus;
    return (
        <div className="blob-container">
            <div className="container d-flex flex-column align-items-center">
                <div className="row pt-4 pb-4">
                    <div className="col-12">
                        <div>
                            <button type="button" className="btn btn-lg btn-owner" onClick={copyAddress}>
                                {!copy ? (
                                    <div>                             
                                        {assetOwnerQuery?.data?.[0] ? (
                                            <span>Owner: {shortenAddress(assetOwnerQuery?.data?.[0].address)}</span>
                                        ) : (
                                            <div>
                                                <span>Owner: &nbsp;</span> 
                                                <div className="spinner-border spinner-border-sm" role="status"></div>  
                                            </div>
                                        )}                                
                                    </div> 
                                ) : (
                                    <div>
                                        <span>Copied!</span>
                                    </div>
                                )}                              
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className="row pb-4">
                    <div className="col-12">
                        <>
                            {blobStatus === BlobStatus.Loading && <></>}                            
                            {blobStatus === BlobStatus.Sold && <></>}
                            {blobStatus === BlobStatus.Auction && <AuctionSection blob={blob} />}                            
                            {blobStatus === BlobStatus.Bid && <BidSection blob={blob} />}
                            {blobStatus === BlobStatus.Close && <CloseSection blob={blob} />}
                            {blobStatus === BlobStatus.Buy && <BidSection blob={blob} />}
                            {blobStatus === BlobStatus.Sell && <AuctionSection blob={blob} />}
                        </>                        
                    </div>
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: #f5f5f5;
                }

                .btn-owner {
                    background-color: #0a2e53;
                    color: white;

                    font-weight: 500;
                    min-width: 19rem;
                }
            `}</style>
        </div>
    )
}

const shortenAddress = (address: string) => {
    const charactersShown = 18;
    if (address.length < charactersShown) return "";

    const start = address.slice(0, 9);
    const end = address.slice(-9);
    
    const shortened = `${start}...${end}`;
    return shortened;
}