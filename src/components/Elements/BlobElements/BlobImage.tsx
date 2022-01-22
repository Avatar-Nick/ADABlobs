import Link from 'next/link';
import Image from 'next/image';
import { BlobStatus } from '../../../types/enum';
import { idToLongString } from '../../../utils/idToLongString';
import { convertIPFSToHTTP, getBlobLocalImage } from '../../../utils/image';
import { lovelaceToAda } from '../../../cardano/consts';
import { useEffect, useState } from 'react';
import { getCountdown } from '../../../utils/time';
import { stakecredential_to_scripthash } from '../../../cardano/custom_modules/@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib_bg.wasm';

interface BlobImageProps  {
    blob: BlobChainAsset,
    blobStatus: BlobStatus,
    auctionDatum?: AuctionDatum,

}
export const BlobImage = ({ blob, blobStatus = BlobStatus.Loading, auctionDatum } : BlobImageProps) => 
{
    const [countdown, setCountdown] = useState({days: -1, hours: -1, minutes: -1, seconds: -1} as Countdown);

    // Set the conditions for updating the countdown
    let intervalId : any;
    if (countdown?.days <= 0 && blobStatus === BlobStatus.Bid) {
        intervalId = setInterval(() => {
            setCountdown(getCountdown(auctionDatum as AuctionDatum));
        }, 1000);
    }

    useEffect(() => {
        if (auctionDatum) {
            setCountdown(getCountdown(auctionDatum as AuctionDatum));
        }
    }, [auctionDatum, setCountdown])

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    if (!blob) return <></>;    
    return (
        <Link href={`/blobs/${blob.asset}`} passHref>
            <div className="blob-content d-flex justify-content-center rounded pb-4 mb-4" >
                <div className="blob-content-inner">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Image src={convertIPFSToHTTP(blob.onchain_metadata.image)} quality={100} width={"400%"} height={"400%"} alt={blob.onchain_metadata.name} placeholder="blur" blurDataURL={getBlobLocalImage(blob.onchain_metadata.id, blob.onchain_metadata.name)} onError={() => setSrc(getBlobLocalImage(blob.onchain_metadata.id, blob.onchain_metadata.name))}/>
                        <div className="blob-name mb-2">{blob.onchain_metadata.name} {idToLongString(blob.onchain_metadata.id)}</div>
                        <>
                            { blobStatus === BlobStatus.Loading && <button type="button" className="btn btn-shade btn-block btn-text"><div className="spinner-border spinner-border-sm" role="status"></div></button>}
                            { blobStatus === BlobStatus.Sold && <button type="button" className="btn btn-shade btn-block btn-text">Sold</button>}
                            { blobStatus === BlobStatus.Auction && <button type="button" className="btn btn-danger btn-block btn-text">Auction</button>}
                            { blobStatus === BlobStatus.Bid && <button type="button" className="btn btn-success btn-block btn-text">Bid{`${getBidAmountText(auctionDatum as AuctionDatum)}`}</button>}
                            { blobStatus === BlobStatus.Close && <button type="button" className="btn btn-primary btn-block btn-text">Close</button>}
                            { blobStatus === BlobStatus.Buy && <button type="button" className="btn btn-success btn-block btn-text">Buy</button>}
                            { blobStatus === BlobStatus.Sell && <button type="button" className="btn btn-danger btn-block btn-text">Sell</button>}                            
                        </>
                        { blobStatus === BlobStatus.Bid && <div className="d-flex justify-content-center auction-timer-container">
                            { <div className="rounded-3 auction-timer">{`${getCountdownText(countdown)}`}</div> }    
                        </div>}
                    </div>
                </div>
                <style jsx>{`
                    .blob-content {                        
                        color: #777777;
                        background-color: white;
                        cursor: pointer;                
                    }

                    .blob-content:hover {
                        transform: scale(1.08);
                    }

                    .blob-content-inner {
                        width: 80%;
                    }

                    .btn-block {
                        width: 100%;
                    }

                    .blob-name {
                        font-size: 1.2rem;
                        font-weight: 700;}

                    .btn-shade {
                        background-color: #3d4142;
                        color: white;
                    }

                    .btn-text {
                        font-weight: 700;
                    }

                    .auction-timer-container {
                        position: relative;
                        width: 75%;
                    }

                    .auction-timer {
                        position: absolute;
                        display: block;
                        
                        background-color: #1b2a4e;/*#3d4142;*/
                        color: white;
                        text-align: center;
                        
                        font-weight: 500;
                        font-size: 0.75rem;

                        top: 0.75rem;
                        padding-top: 0.2rem;
                        padding-bottom: 0.2rem;
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                `}</style> 
            </div>
        </Link>
    )
}

const getBidAmountText = (blobAuctionDatum : AuctionDatum) => {
    if (!blobAuctionDatum) return "";

    if (blobAuctionDatum?.adBidDetails) {
        const reserveAmount = parseInt(blobAuctionDatum.adBidDetails.bdBid) * lovelaceToAda;
        return ` - ₳${numberWithCommas(reserveAmount)}`;
    }

    const reserveAmount = parseInt(blobAuctionDatum.adAuctionDetails.adMinBid) * lovelaceToAda;
    return ` - ₳${numberWithCommas(reserveAmount)}`;
}

const numberWithCommas = (lovelaces : Number) => {
    return lovelaces.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const getCountdownText = (countdown: Countdown) => {
    if (countdown.days > 1) {
        return `${countdown.days} days`;
    }
    else if (countdown.days === 1) {
        return `${countdown.days} day`;
    }
    else if (countdown.hours > 1) {
        return `${countdown.hours} hours`;
    }
    else if (countdown.hours === 1) {
        return `${countdown.hours} hour`;
    }
    else if (countdown.minutes > 1) {
        return `${countdown.minutes} minutes`;
    }
    else if (countdown.minutes === 1) {
        return `${countdown.minutes} minute`;
    }
    else if (countdown.seconds > 1) {
        return `${countdown.seconds} seconds`;
    }
    else if (countdown.seconds === 1) {
        return `${countdown.seconds} second`;
    }

    return "Completed";
}