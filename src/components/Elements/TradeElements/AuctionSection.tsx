import Image from 'next/image';
import { transact } from "../../../cardano/wallet/transact"

export const AuctionSection = ({ blob } : { blob : BlobChainAsset}) => 
{
    return (
        <div className="blob-auction container rounded">
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8 ">
                    <span className="auction-title-text">Start An Auction For {blob.onchain_metadata.name}!</span>               
                    <hr className="divider" />
                    <form className="blob-form">
                        <label className="form-label label-text ">Starting Bid</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" className="form-control input-bid" placeholder="Starting Bid" aria-describedby="blobBidPrice" />
                        </div>
                        <label className="form-label label-text ">Start Date Time</label>
                        <div className="input-group mb-3">
                            <input type="datetime-local" className="form-control input-bid" placeholder="Start Date Time" aria-describedby="startDatetime" />
                        </div>
                    </form>
                    <button type="button" className="btn btn-danger btn-trade mb-4" onClick={transact}>Start Auction</button>
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
                    
                    width: 80vw;
                }
                
                .auction-title-text {
                    font-size: 0.8rem;
                    font-weight: 500;                   
                }

                .blob-purchase-title {
                    font-size: 1.0rem;
                }
                
                @media screen and (min-width: 576px) {
                    .auction-title-text {
                        font-size: 2.4vw;
                    }

                    .blob-purchase-title {
                        font-size: 1.4rem;
                    }
                }
                
                @media screen and (min-width: 1200px) {
                    .blob-auction {
                        width: 54vw;
                    }

                    .auction-title-text {
                        font-size: 1.8vw;
                    }
                }

                .label-text {
                    font-weight: 500;
                    color: #0a2e53;               
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