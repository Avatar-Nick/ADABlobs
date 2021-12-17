import Image from 'next/image';
import { toHex } from '../../../cardano/serialization';
import { getBaseAddress } from '../../../cardano/wallet/wallet';
import { start } from '../../../cardano/plutus/contract';
import { adaToLovelace, fee } from '../../../cardano/consts';

export const AuctionSection = ({ blob } : { blob : BlobChainAsset}) =>
{

    const submitStartTransaction = async (event : any) => {
        event.preventDefault();

        const reservePrice = event.target.amount.value;
        const reservePriceLovelace = reservePrice * adaToLovelace;
        const startDateTime = new Date(event.target.startDatetime.value);
        const endDateTime = new Date(event.target.endDatetime.value);

        const walletAddress = await getBaseAddress();

        // If this is a local environment, use the testnet
        let adCurrency = blob.policy_id; // policy_id
        let adToken = blob.asset_name; // token_id
        console.log(blob);
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {

            //adToken = "asset15gvggz5s3ptfadt3x6d8p7n5x3petfhrqeps6n";
            // This is the Sundaeswap Mint test token
            adCurrency = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522";
            adToken = "4d494e54";
        }

        // QUESTION: Why does the getBaseAddress not equal the getAddress?
        // Will this be an error for the marketplace address since im using addr...
        const adSeller = toHex(walletAddress.payment_cred().to_keyhash().to_bytes())
        const adDeadline = endDateTime.getTime().toString();
        const adStartTime = startDateTime.getTime().toString();
        const adMinBid = reservePriceLovelace.toString();
        const adMarketplacePercent = fee; // Corresponds to 1%
        const adMarketplaceAddress = (process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as string).toString();
        
        const auctionDetails : AuctionDetails = { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid, adMarketplacePercent, adMarketplaceAddress }
        console.log("auctionDetails", auctionDetails);
        const txHash = await start(auctionDetails);

        // Check transaction and twitter bot (lol nice)
        console.log(txHash);
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
                    <form className="blob-form" onSubmit={submitStartTransaction}>
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