import Image from 'next/image';
import { bid, close } from '../../../cardano/plutus/contract';
import { toHex } from '../../../cardano/serialization';
import { getBaseAddress } from '../../../cardano/wallet/wallet';

export const BidSection = ({ blob } : { blob : BlobChainAsset}) => 
{
    const submitBidTransaction = async (event : any) => {
        event.preventDefault();
        const walletAddress = await getBaseAddress();

        let asset = blob.asset;
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {

            // This is the SundaeSwap Mint test token
            asset = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54";
        }

        const bdBidder = toHex(walletAddress.payment_cred().to_keyhash().to_bytes());
        const bidAmount = event.target.amount.value;
        const bidDetails : BidDetails = { bdBidder, bdBid: bidAmount }
        
        const txHash = await bid(asset, bidDetails);

        console.log(txHash);
    }

    const submitCloseTransaction = async (event: any) => {
        event.preventDefault();

        const txHash = await close(blob.asset);
        
        // Check transaction and twitter bot (lol nice)
        console.log(txHash);
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
                    <form className="blob-form" onSubmit={submitBidTransaction}>
                        <div className="input-group mt-3 mb-3">
                            <span className="input-group-text input-bid">₳</span>
                            <input type="number" name="amount" className="form-control input-bid" placeholder="Bid Amount" aria-describedby="blobBidPrice" />
                        </div>
                        <button type="submit" className="btn btn-success btn-trade mb-4">Place Bid</button>
                    </form>
                    <button type="submit" className="btn btn-primary btn-trade mb-4" onClick={submitCloseTransaction}>Close (After Deadline Test)</button>
                    
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