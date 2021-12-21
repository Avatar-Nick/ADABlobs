import { useState } from 'react';
import Image from 'next/image';
import { toHex } from '../../../cardano/serialization';
import { getBaseAddress, getBaseAddressFromAddressString } from '../../../cardano/wallet/wallet';
import { start } from '../../../cardano/plutus/contract';
import { adaToLovelace, fee } from '../../../cardano/consts';

export const AuctionSection = ({ blob } : { blob : BlobChainAsset}) =>
{
    const [showError, setShowError] = useState(false);
    const [errorString, setErrorString] = useState(" A problem has been occurred while submitting your data.");

    const closeError = () => {
        setShowError(false);
    }

    const checkFields = (target: any): boolean =>
    {
        if (!target?.amount?.value) {
            throw new Error("Reserve Price is required")
        }

        if (target?.amount?.value < 0) {
            throw new Error("Reserve Price cannot be negative")
        }

        if (!target?.startDatetime?.value) {
            throw new Error("Start Date Time is required")
        }
        return true;
    }

    const submitStartTransaction = async (event : any) => {
        event.preventDefault();        
        setShowError(false);

        const buttonIndex = 3;
        const auctionButton = event.target[buttonIndex];
        const auctionText = auctionButton.children[0];
        const auctionSpinner = auctionButton.children[1];
        
        try {
            auctionButton.disabled = true;
            auctionText.classList.add("visually-hidden");
            auctionSpinner.classList.remove("visually-hidden");

            checkFields(event.target);

            const reservePrice = event.target.amount.value;
            const reservePriceLovelace = reservePrice * adaToLovelace;
            const startDateTime = new Date(event.target.startDatetime.value);
            const endDateTime = new Date(event.target.endDatetime.value);

            const walletAddress = await getBaseAddress();
            const marketplaceAddress = await getBaseAddressFromAddressString(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as string)

            // If this is not a production environment, use the testnet
            let adCurrency = blob.policy_id;
            let adToken = blob.asset_name;
            if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {

                // This is the SundaeSwap Mint test token
                adCurrency = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522";
                adToken = "4d494e54";
            }

            const adSeller = toHex(walletAddress.payment_cred().to_keyhash().to_bytes())
            const adDeadline = endDateTime.getTime().toString();
            const adStartTime = startDateTime.getTime().toString();
            const adMinBid = reservePriceLovelace.toString();
            const adMarketplacePercent = fee; // Corresponds to 1%
            const adMarketplaceAddress = toHex(marketplaceAddress.payment_cred().to_keyhash().to_bytes())
        
            const auctionDetails : AuctionDetails = { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid, adMarketplacePercent, adMarketplaceAddress }
            const txHash = await start(auctionDetails);

            auctionButton.disabled = false;
            auctionText.classList.remove("visually-hidden");
            auctionSpinner.classList.add("visually-hidden");

            console.log(txHash);
        }
        catch (error: any) {  
            setShowError(true);
            setErrorString(error?.message);
            
            auctionButton.disabled = false;
            auctionText.classList.remove("visually-hidden");
            auctionSpinner.classList.add("visually-hidden");
            console.error(error);
        }
    }

    return (
        <div className="blob-auction container rounded">
            {showError && <div className="alert alert-danger alert-dismissible fade show mt-3">
                <strong>Error!</strong> {errorString}
                <button type="button" className="btn-close" onClick={closeError} data-bs-dismiss="alert"></button>
            </div> }
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
                        
                        <button type="submit" className="btn btn-danger btn-trade mb-4">
                            <span>Start Auction</span>
                            <div className="visually-hidden spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </button>
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