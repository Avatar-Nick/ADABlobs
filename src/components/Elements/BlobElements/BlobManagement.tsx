import { AuctionSection } from "../TradeElements/AuctionSection";
import { BidSection } from "../TradeElements/BidSection";
import { useOwnedAssets, useScriptAssets } from "../../../hooks/assets.hooks";
import { useIsConnected } from "../../../hooks/wallet.hooks";
import { getBlobStatus } from "../../../utils/blobs/blobStatus";
import { BlobStatus } from "../../../types/enum";

export const BlobManagement = ({ blob } : { blob : BlobChainAsset}) => 
{
    const connectedQuery = useIsConnected();
    const ownedAssetsQuery = useOwnedAssets();
    const scriptAssetsQuery = useScriptAssets()
    const blobStatus: BlobStatus = getBlobStatus(connectedQuery.data, blob, ownedAssetsQuery.data, scriptAssetsQuery.data) as BlobStatus;
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

                    font-weight: 500;
                }
            `}</style>
        </div>
    )
}
