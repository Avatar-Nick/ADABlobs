import Image from 'next/image';
import { START } from '../../../cardano/plutus/contract';
import { toHex } from '../../../cardano/serialization';
import { getAddress, getBaseAddress } from '../../../cardano/wallet/wallet';
import { getUTCDatetime } from '../../../utils/blobs/blobReveal';

export const AuctionSection = ({ blob } : { blob : BlobChainAsset}) =>
{

    const submitTransaction = async (event : any) => {
        event.preventDefault();

        const reservePrice = event.target.amount.value;
        const startDateTime = new Date(event.target.startDatetime.value);
        const endDateTime = new Date(event.target.endDatetime.value);

        const walletAddress = await getBaseAddress();

        const adSeller = toHex(walletAddress.payment_cred().to_keyhash().to_bytes())
        const adCurrency = blob.policy_id; // policy_id
        const adToken = blob.asset_name; // token_id
        const adDeadline = startDateTime.getTime().toString(); // December 11th 4pm
        const adStartTime = endDateTime.getTime().toString(); // December 11th 12pm,
        const adMinBid = reservePrice.toString();
        
        const auctionDetails : AuctionDetails = { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid }
        const datum = START(auctionDetails);
    }

    return (
        <div className="blob-auction container rounded">
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8 ">
                    <span className="auction-title-text">Start An Auction For {blob.onchain_metadata.name}!</span>               
                    <hr className="divider" />
                    <form className="blob-form" onSubmit={submitTransaction}>
                        <label className="form-label label-text ">Reserve Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" name="amount" className="form-control input-bid" placeholder="Reserve Price" aria-describedby="blobBidPrice" />
                        </div>
                        <label className="form-label label-text ">Start Date Time</label>
                        <div className="input-group mb-3">
                            <input type="datetime-local" name="startDatetime" className="form-control input-bid" placeholder="Start Date Time" aria-describedby="startDatetime" />
                        </div>
                        <label className="form-label label-text ">End Date Time</label>
                        <div className="input-group mb-3">
                            <input type="datetime-local" name="endDatetime" className="form-control input-bid" placeholder="End Date Time" aria-describedby="endDatetime" />
                        </div>
                        
                        <button type="submit" className="btn btn-danger btn-trade mb-4">Start Auction</button>
                    </form>
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