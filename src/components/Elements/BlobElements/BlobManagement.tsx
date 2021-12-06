import { AuctionSection } from "../TradeElements/AuctionSection";
import { BidSection } from "../TradeElements/BidSection";

export const BlobManagement = ({ blob } : { blob : BlobChainAsset}) => 
{
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
                        <AuctionSection blob={blob} />
                        {/*<BidSection blob={blob} />*/}
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
