import {  useState } from 'react';
import Image from 'next/image';
import { lovelaceToAda } from '../../../cardano/consts';
import { close } from '../../../cardano/plutus/contract';
import { useAssetAuction, useAssetClose } from '../../../hooks/assets.hooks';
import { useGetAddress } from '../../../hooks/wallet.hooks';
import { months } from '../../../consts/consts';
import { Trader } from '../../../types/enum';

export const CloseSection = ({ blob } : { blob : BlobChainAsset}) => 
{
    const [showSuccess, setShowSuccess] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorString, setErrorString] = useState("Ensure all fields are correct, your Cardano wallet is connected, and that the page has not been updated. If you require help please reach out in our Discord channel.");

    const asset = getAsset(blob.asset);
    const assetAuctionQuery = useAssetAuction(asset);
    const assetCloseQuery = useAssetClose(asset);
    const assetAddressQuery = useGetAddress();

    const auctionDatum: AuctionDatum = (assetAuctionQuery?.data as AuctionDatum);
    const bdBid = auctionDatum?.adBidDetails?.bdBid;

    const address = assetAddressQuery?.data;
    const bidderAddress = assetCloseQuery?.data?.bidderAddress;
    const sellerAddress = assetCloseQuery?.data?.sellerAddress;    

    let trader = Trader.None;
    if (address && bidderAddress && address === bidderAddress) {
        trader = Trader.Buyer;
    }
    else if (address && sellerAddress && address === sellerAddress) {
        trader = Trader.Seller;
    }
    
    const closeAlert = () => {
        setShowSuccess(false);
        setShowError(false);
    }

    const submitCloseTransaction = async (event: any) => {
        event.preventDefault();
        setShowSuccess(false);
        setShowError(false);

        const buttonIndex = 0;
        const closeButton = event.target[buttonIndex];        
        const closeText = closeButton.children[0];
        const closeSpinner = closeButton.children[1];

        try {
            closeButton.disabled = true;
            closeText.classList.add("visually-hidden");
            closeSpinner.classList.remove("visually-hidden");

            let asset = getAsset(blob.asset);
            const txHash = await close(asset);
            
            closeButton.disabled = false;
            closeText.classList.remove("visually-hidden");
            closeSpinner.classList.add("visually-hidden");
    
            setShowSuccess(true);
            setTxHash(txHash);
        }
        catch (error: any) {
            setShowError(true);

            if (error?.info) setErrorString(error.info);
            else if (error?.message) setErrorString(error.message);
            else setErrorString("Ensure all fields are correct, your Cardano wallet is connected, and that the page has not been updated. If you require help please reach out in our Discord channel.");
            
            closeButton.disabled = false;
            closeText.classList.remove("visually-hidden");
            closeSpinner.classList.add("visually-hidden");
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
            <strong>Success!</strong> Transaction successfully submitted! The transaction will be show up on chain momentarily.
                <br />
                <span><strong>Transaction hash:</strong> <a href={`https://cardanoscan.io/transaction/${txHash}`} className='link' target="_blank" rel="noopener noreferrer">{txHash}</a></span>
                <button type="button" className="btn-close" onClick={closeAlert} data-bs-dismiss="alert"></button>
            </div>}
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8 ">
                    {address && <span className="bid-title-text">{getTimeText(auctionDatum)}</span>}
                    {(!address || !sellerAddress) &&
                        <div className={"d-flex justify-content-center mt-4 mb-4 pb-3"}>
                            <div className="spinner-border" role="status"></div>
                        </div>
                    }

                    {/* Case if Blob is bought in the auction */}
                    {address && bidderAddress && sellerAddress && (trader === Trader.Buyer || trader === Trader.Seller) &&
                    <div className="bid-timer rounded pt-2 pb-2 mt-2">
                        {!blob?.onchain_metadata?.name && <div className="spinner-border spinner-border-sm" role="status"></div> }  
                        {blob?.onchain_metadata?.name && bdBid &&
                        <div>
                            {trader == Trader.Seller && <>You sold <strong>{blob?.onchain_metadata?.name}</strong> for {(parseInt(bdBid) * lovelaceToAda).toFixed(2)}₳!</>}
                            {trader === Trader.Buyer && <>You bought <strong>{blob?.onchain_metadata?.name}</strong> for {(parseInt(bdBid) * lovelaceToAda).toFixed(2)}₳!</>}
                        </div>}
                    </div>}
                    {address && bidderAddress && sellerAddress && trader === Trader.Buyer &&
                    <div className='pet-blob pt-3 px-2'>
                        Make sure your new Pet Blob is happy and well fed!
                    </div>
                    }

                    {/* Case if Blob is not bought in the auction */}
                    {address && !bidderAddress && sellerAddress && trader === Trader.Seller &&
                    <div className="bid-timer rounded pt-2 pb-2 mt-2">
                        {!blob?.onchain_metadata?.name && <div className="spinner-border spinner-border-sm" role="status"></div> }  
                        {blob?.onchain_metadata?.name &&
                        <div>
                            {trader == Trader.Seller && <><strong>{blob?.onchain_metadata?.name}</strong> was not sold</>}
                        </div>}
                    </div>}
                    {address && bidderAddress && sellerAddress && trader === Trader.None && 
                    <div className="bid-timer rounded pt-2 pb-2 mt-2">
                        {!blob?.onchain_metadata?.name && <div className="spinner-border spinner-border-sm" role="status"></div> }  
                        {blob?.onchain_metadata?.name && 
                        <div>
                            <strong>{blob?.onchain_metadata?.name}</strong> was bought for {(parseInt(bdBid as string) * lovelaceToAda).toFixed(2)}₳!
                        </div>
                        }
                    </div>}

                    <hr className="divider" />
                    <form className="blob-form" onSubmit={submitCloseTransaction}>
                        <button type="submit" className="btn btn-primary btn-trade mb-4">
                            <span>Close Auction</span>
                            <div className="visually-hidden spinner-border spinner-border-sm" role="status"></div>
                        </button>
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

                    font-size: 2.0vw;
                    font-weight: 500;
                }

                .blob-purchase-title {
                    font-size: 1.0rem;
                }

                .pet-blob {
                    font-size: 1.8vw;
                    font-weight: 500;
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

                    .pet-blob {
                        font-size: 1.6vw;
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

                    .pet-blob {
                        font-size: 1.2vw;
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

                .link {
                    color: #0f5132;
                }

                .link:hover {
                    color: #578570;
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

    // Combine everything into the auction string
    const auctionString = `Auction ended ${month} ${date}, ${year} at ${hour12}:${minuteText} ${suffix}`;
    return auctionString
}