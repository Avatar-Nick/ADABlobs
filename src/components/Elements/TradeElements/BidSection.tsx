import { useEffect, useState } from 'react';
import Image from 'next/image';
import { adaToLovelace, lovelaceToAda } from '../../../cardano/consts';
import { bid } from '../../../cardano/plutus/contract';
import { toHex } from '../../../cardano/serialization';
import { getBaseAddress } from '../../../cardano/wallet/wallet';
import { useAssetAuction } from '../../../hooks/assets.hooks';
import { months } from '../../../consts/consts';
import { getCountdown } from '../../../utils/time';

export const BidSection = ({ blob } : { blob : BlobChainAsset}) => 
{
    const [showSuccess, setShowSuccess] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorString, setErrorString] = useState("Ensure all fields are correct, your Cardano wallet is connected, and that the page has not been updated. If you require help please reach out in our Discord channel.");

    const assetAuctionQuery = useAssetAuction(getAsset(blob.asset));
    const auctionDatum: AuctionDatum = (assetAuctionQuery.data as AuctionDatum);
    const { adMinBid } : any = auctionDatum?.adAuctionDetails || { };
    const { bdBid } : any = auctionDatum?.adBidDetails || { };

    const [countdown, setCountdown] = useState({days: -1, hours: -1, minutes: -1, seconds: -1} as Countdown);
    const countdownText = getAllCountdownText(countdown);
    const auctionEnded = isAuctionEnded(countdown);

    let intervalId = setInterval(() => {
        setCountdown(getCountdown(auctionDatum));
    }, 1000);

    useEffect(() => {
        if (auctionDatum) {
            setCountdown(getCountdown(auctionDatum));
        }
    }, [auctionDatum, setCountdown])

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);    
    
    const closeAlert = () => {
        setShowSuccess(false);
        setShowError(false);
    }

    const validateFields = (target: any) => {
        if (!target?.amount?.value) {
            throw new Error("Bid Amount is required.");
        }

        const reserveAmount = parseInt(adMinBid);
        const newBid = target.amount.value * adaToLovelace;        
        if (newBid <= reserveAmount) {
            throw new Error("Bid Amount must be larger than the reserve amount.");
        }

        if (bdBid && newBid <= bdBid) {
            throw new Error("Bid Amount must be larger than the current bid.");
        }
    }

    const submitBidTransaction = async (event : any) => {
        event.preventDefault();
        setShowSuccess(false);
        setShowError(false);

        const buttonIndex = 1;
        const bidButton = event.target[buttonIndex];        
        const bidText = bidButton.children[0];
        const bidSpinner = bidButton.children[1];

        try {
            bidButton.disabled = true;
            bidText.classList.add("visually-hidden");
            bidSpinner.classList.remove("visually-hidden");
    
            validateFields(event.target);
            
            const walletAddress = await getBaseAddress();

            let asset = getAsset(blob.asset);    
            const bdBidder = toHex(walletAddress.payment_cred().to_keyhash().to_bytes());
            const bidAmountLovelace = (event.target.amount.value * adaToLovelace).toString();
            const bidDetails : BidDetails = { bdBidder, bdBid: bidAmountLovelace }
            
            const txHash = await bid(asset, bidDetails);
    
            bidButton.disabled = false;
            bidText.classList.remove("visually-hidden");
            bidSpinner.classList.add("visually-hidden");
    
            setShowSuccess(true);
            setTxHash(txHash);
        }
        catch (error: any) {  
            setShowError(true);

            if (error?.info) setErrorString(error.info);
            else if (error?.message) setErrorString(error.message);
            else setErrorString("Ensure all fields are correct, your Cardano wallet is connected, and that the page has not been updated. If you require help please reach out in our Discord channel.");
            
            bidButton.disabled = false;
            bidText.classList.remove("visually-hidden");
            bidSpinner.classList.add("visually-hidden");
            console.error(error);
        }  
    }

    return (
        <div className="blob-bid container rounded mb-4">
            {showError && <div className="alert alert-danger alert-dismissible fade show mt-3">
                <strong>Error!</strong> {errorString}
                <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert"></button>
            </div> }
            {showSuccess && <div className="alert alert-success alert-dismissible fade show mt-3 wrap">
                <strong>Success!</strong> Transaction successfully submitted! 
                <br />
                <strong>Transaction hash:</strong> {txHash}
                <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert"></button>
            </div>}
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8 ">
                    <span className="bid-title-text">{getTimeText(auctionDatum)}</span>
                    <div className="bid-timer rounded pt-2 pb-2 mt-2">
                        {!countdownText && <div className="spinner-border spinner-border-sm" role="status"></div> }
                        {countdownText && !auctionEnded && <div>
                            {countdownText.days} Days    
                        </div>}
                        {countdownText && !auctionEnded && <div>
                            {countdownText.hours} Hours    
                        </div>}
                        {countdownText && !auctionEnded && <div>
                            {countdownText.minutes} Minutes   
                        </div>}
                        {countdownText && !auctionEnded && <div>
                            {countdownText.seconds} Seconds   
                        </div>}
                        {auctionEnded && blob?.onchain_metadata?.name &&
                        <div>
                            The Auction For <strong>{`${blob.onchain_metadata.name}`}</strong> Has Ended
                        </div>
                        }
                    </div>      
                    {auctionEnded && <div className="close-text mt-2">
                        Please wait 15 minutes for the auction to confirm on the blockchain before you can close.
                    </div> }             
                    <hr className="divider" />
                    <div className='mb-3'>
                        <span className="blob-purchase-title">{getTopBidText(auctionDatum)}  </span>
                        {!auctionDatum && <div className="spinner-border spinner-border-sm" role="status"></div>}
                        <span className="blob-purchase-title blob-purchase-text mt-4">{getTopBid(auctionDatum)}</span>
                    </div>                    
                    {!auctionEnded && <form className="blob-form" onSubmit={submitBidTransaction}>
                        <div className="input-group mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" step="0.01" min="0" name="amount" className="form-control input-bid" placeholder="Bid Amount" aria-describedby="blobBidPrice" />
                        </div>
                        <button type="submit" className="btn btn-success btn-trade mb-4">
                            <span>Place Bid</span>
                            <div className="visually-hidden spinner-border spinner-border-sm" role="status"></div>
                        </button>
                    </form>}                 
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

                    font-size: 2.0vw;
                    font-weight: 500;
                }

                .blob-purchase-title {
                    font-size: 1.0rem;
                }

                .close-text {
                    font-size: 1.4vw;
                }
                
                @media screen and (min-width: 576px) {
                    .bid-title-text {
                        font-size: 1.5vw;
                    }

                    .bid-timer {
                        font-size: 2.2vw;
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
                        font-size: 1.4vw;
                    }

                    .close-text {
                        font-size: 1.1vw;
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

                .wrap {
                    overflow-wrap: anywhere;
                }
            `}</style>
        </div>
    )
}

const getAsset = (blobAsset: string) => {
    let asset = blobAsset;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {

        // This is the SundaeSwap Mint test token
        asset = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54";
    }

    // Mainnet test
    // asset = "e15ffd26ee2409db0cd76a014020125a947d5137a35b70e27bf33bb074657374";
    return asset;
}

const getTimeText = (auctionDatum: AuctionDatum) => {
    if (!auctionDatum) return "";
    const { adDeadline } : any = auctionDatum?.adAuctionDetails || { };

    // Get Datetime data
    // Decrement endDateTime by 15 minutes to account for ttl (time to live)
    const fifteenMinutes = 1000 * 60 * 15;
    const datetime = new Date(parseInt(adDeadline) - fifteenMinutes);
    const month = months[datetime.getMonth()];
    const date = datetime.getDate()
    const year = datetime.getFullYear()
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    
    // Get string data
    const suffix = (hours >= 12) ? 'PM' : 'AM';
    let hour12 = (hours > 12) ? hours -12 : hours;
    hour12 = hour12 === 0 ? hour12 = 12 : hour12;
    const minuteText = (minutes > 10) ? minutes.toString() : `0${minutes.toString()}`;

    // Check if the auction has ended
    let isAuctionEnded = false;
    const now = Date.now();
    if (now > (datetime.getTime())) {
        isAuctionEnded = true;
    }

    // Combine everything into the auction string
    const auctionString = `Auction ${isAuctionEnded ? 'ended' : 'ends'} ${month} ${date}, ${year} at ${hour12}:${minuteText} ${suffix}`;
    return auctionString
}

const getCountdownText = (count: Number) => {
    if (count === null || count === undefined) return "";

    if (count >= 0 && count <= 9) {
        return `0${count.toString()}`;
    }

    return count.toString()
}

const getAllCountdownText = (countdown: Countdown) => {
    if (!countdown || !('days' in countdown) || !('hours' in countdown) || !('minutes' in countdown) || !('seconds' in countdown)) return null;

    return { 
        days: getCountdownText(countdown.days), 
        hours: getCountdownText(countdown.hours), 
        minutes: getCountdownText(countdown.minutes), 
        seconds: getCountdownText(countdown.seconds), 
    };
}

const isAuctionEnded = (countdown: Countdown): boolean => {
    if (!countdown) return false;

    return (countdown.days < 0 || countdown.hours < 0 || countdown.minutes < 0 || countdown.seconds < 0);
}

const getTopBid = (auctionDatum: AuctionDatum) => {
    const { adMinBid } : any = auctionDatum?.adAuctionDetails || { };
    const { bdBid } : any = auctionDatum?.adBidDetails || { };

    if (!adMinBid && !bdBid) return "";

    if (!bdBid) {
        const reserveAmount = (parseInt(adMinBid) * lovelaceToAda);
        return `${numberWithCommas(reserveAmount)} ₳`;
    }

    const bidAmount = (parseInt(bdBid) * lovelaceToAda);
    return `${numberWithCommas(bidAmount)} ₳`;
}

const getTopBidText = (auctionDatum: AuctionDatum) => {
    if (!auctionDatum) return "Loading...";

    const { adMinBid } : any = auctionDatum?.adAuctionDetails || { };
    const { bdBid } : any = auctionDatum?.adBidDetails || { };

    if (!adMinBid && !bdBid) return "No Auction";
    if (!bdBid) return "Reserve Amount: ";
    return "Top Bid: ";
}

const numberWithCommas = (lovelaces : Number) => {
    return lovelaces.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}