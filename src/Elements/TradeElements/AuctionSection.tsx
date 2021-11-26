export const AuctionSection = ({ id } : { id : number}) => 
{
    return (
        <div className="blob-auction container rounded">
            <div className="row pt-3">
                <div className="col-2">
                    <img width={"40px"} height={"40px"} src="/images/CardanoLogo.png" />
                </div>
                <div className="col-8 blob-trade-text">
                    <span className="auction-title-text">Auction ends November 26, 2021 at 4:59pm EST</span>    
                    <div className="auction-timer rounded pt-2 pb-2 mt-2">
                        <div>
                            00 Hours    
                        </div>
                        <div>
                            00 Minutes   
                        </div>
                        <div>
                            00 Seconds   
                        </div>
                    </div>                   
                    <hr className="divider" />
                    <span className="blob-purchase-title">Top Bid:&nbsp;</span>
                    <span className="blob-purchase-title blob-purchase-text">100 ADA</span>
                    <form className="blob-form">
                        <div className="input-group mt-3 mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" className="form-control input-bid" placeholder="Bid Amount" aria-describedby="blobBidPrice" />
                        </div>
                    </form>
                    <button type="button" className="btn btn-success btn-trade">Place Bid</button>
                </div>       
                <div className="col-2"></div>                                          
            </div>
            <style jsx>{`

                .blob-auction {
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

                .blob-trade-text {
                    font-weight: 500;
                    font-size: 1.6rem;
                }

                .blob-purchase-title {
                    font-size: 1.4rem;
                }

                .blob-purchase-text {
                    font-weight: 700;
                }

                .btn-trade {
                    width: 100%;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-weight: 500;
                }

                .divider {
                    background-color: #bbc9ec;
                    height: 1px;
                    opacity: 1.0;
                }

                .auction-title-text {
                    font-size: 1.0rem;
                }

                .auction-text {
                    font-size: 0.7rem;
                }

                .auction-timer {
                    display: flex;
                    justify-content: space-around;

                    background-color: #cde1f8;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                }
                
                .input-bid {
                    color: #0a2e53;                    
                    font-weight: 500;
                }

                .input-group-text {
                    background-color: #cde1f8;
                }
            `}</style>
        </div>
    )
}