import { AuctionSection } from "../TradeElements/AuctionSection";
import { BidSection } from "../TradeElements/BidSection";
import { useOwnedAssets, useScriptAssets } from "../../../hooks/assets.hooks";
import { useGetAddress } from "../../../hooks/wallet.hooks";
import { getBlobStatus } from "../../../utils/blobs/blobStatus";
import { BlobStatus } from "../../../types/enum";

export const BlobManagement = ({ blob } : { blob : BlobChainAsset}) => 
{
    const addressQuery = useGetAddress();
    const ownedAssetsQuery = useOwnedAssets(addressQuery.data);
    const scriptAssetsQuery = useScriptAssets(!!addressQuery.data)
    const blobStatus: BlobStatus = getBlobStatus(blob, ownedAssetsQuery.data, scriptAssetsQuery.data) as BlobStatus;
    return (
        <div className="blob-container">
            <div className="container d-flex flex-column align-items-center">
                <div className="row pt-4 pb-4">
                    <div className="col-12">
                        <div>
                            <button type="button" className="btn btn-lg btn-owner">Owner: addr1q9s8...zjsdvf26q</button>
                        </div>
                    </div>
                </div>
                <div className="row pb-4">
                    <div className="col-12">
                        <>
                            {blobStatus === BlobStatus.Waiting && <></>}
                            {blobStatus === BlobStatus.Sold && <></>}
                            {blobStatus === BlobStatus.Bid && <BidSection blob={blob} />}
                            {blobStatus === BlobStatus.Buy && <BidSection blob={blob} />}
                            {blobStatus === BlobStatus.Sell && <AuctionSection blob={blob} />}
                            {blobStatus === BlobStatus.Auction && <AuctionSection blob={blob} />}
                        </>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: white;
                }

                .btn-owner {
                    background-color: #0a2e53;
                    color: white;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-weight: 500;
                }

                .blob-management {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec;

                    width: 54vw;
                    height: 27vw;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
                }

                .blob-properties {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 54vw;
                    height: 20vw;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
                }

                .blob-properties h2 {
                    font-weight: 700;
                    margin-bottom: 0;
                }

                .blob-properties-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background-color: #edf0f6;

                    width: 20vw;
                    height: 4vw;
                }

                .blob-properties-text {
                    font-weight: 500;
                    font-size: 1.6rem;
                }
            `}</style>
        </div>
    )
}
