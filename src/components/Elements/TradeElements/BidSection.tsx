import Image from 'next/image';
import { transact } from "../../../cardano/wallet/transact"

export const BidSection = ({ blob } : { blob : BlobChainAsset}) => 
{
    const submitTransaction = async (event : any) => {
        event.preventDefault();
        console.log('test');
        console.log(event);
        console.log(event.target.amount.value);
        console.log(blob.asset);
        console.log(blob.onchain_metadata.name);
    }
    return (
        <div className="blob-bid container rounded">
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8 ">
                    <span className="bid-title-text">Auction ends November 26, 2021 at 4:59pm EST</span>    
                    <div className="bid-timer rounded pt-2 pb-2 mt-2">
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
                    <form className="blob-form" onSubmit={submitTransaction}>
                        <div className="input-group mt-3 mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" name="amount" className="form-control input-bid" placeholder="Bid Amount" aria-describedby="blobBidPrice" />
                        </div>
                        <button type="submit" className="btn btn-success btn-trade mb-4">Place Bid</button>
                    </form>
                    
                </div>       
                <div className="col-2"></div>                                          
            </div>
            <style jsx>{`

                .blob-bid {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 80vw;
                }
                
                .bid-title-text {
                    font-size: 1.9vw;
                    font-weight: 500;                    
                } 

                .bid-timer {
                    display: flex;
                    justify-content: space-around;

                    background-color: #cde1f8;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec;

                    font-size: 2.7vw;
                    font-weight: 500;
                }

                .blob-purchase-title {
                    font-size: 1.0rem;
                }
                
                @media screen and (min-width: 576px) {
                    .bid-title-text {
                        font-size: 1.5vw;
                    }

                    .bid-timer {
                        font-size: 2.4vw;
                    }

                    .blob-purchase-title {
                        font-size: 1.4rem;
                    }
                }
                
                @media screen and (min-width: 1200px) {
                    .blob-bid {
                        width: 54vw;
                    }

                    .bid-title-text {
                        font-size: 0.9vw;
                    }

                    .bid-timer {
                        font-size: 1.6vw;
                    }
                }

                .blob-properties h2 {
                    font-weight: 700;
                    margin-bottom: 0;
                }

                .blob-purchase-text {
                    font-weight: 700;
                }

                .btn-trade {
                    width: 100%;

                    font-weight: 500;
                }

                .divider {
                    background-color: #bbc9ec;
                    height: 1px;
                    opacity: 1.0;
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