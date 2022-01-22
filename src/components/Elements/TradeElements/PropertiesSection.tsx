import Image from 'next/image';
import { idToLongString } from '../../../utils/idToLongString';

export const PropertiesSection = ({ blob } : { blob : BlobChainAsset }) =>
{
    if (!blob) return <></>
    return (
        <div className="blob-properties container rounded mb-4">
            <div className="row pt-3">
                <div className="col-2">
                    <Image src="/images/CardanoLogo.png" width={40} height={40} quality={100} alt="Cardano Logo" />
                </div>
                <div className="col-8">
                    <div className="row">
                        <span className="properties-title-text">{blob.onchain_metadata.name} Properties</span>     
                    </div>
                    <div className="row pt-2">
                        <hr className="divider" />    
                    </div>
                    <div className="row pt-2">
                        <span className="properties-text"><strong>Blob ID:</strong> {idToLongString(blob.onchain_metadata.id)}</span>     
                    </div>
                    <div className="row pt-2">
                        <span className="properties-text"><strong>Color:</strong> {blob.onchain_metadata.color}</span>     
                    </div>
                    <div className="row pt-2 pb-4">
                        <span className="properties-text"><strong>Hex Color:</strong> #{blob.onchain_metadata.hex}</span>     
                    </div>
                </div>       
                <div className="col-2"></div>                                          
            </div>
            <style jsx>{`                
                .blob-properties {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 80vw;
                }
                
                .properties-title-text {
                    text-align: center;
                    font-size: 4.8vw;
                    font-weight: 500;                   
                }

                .properties-text {
                    font-size: 4.4vw;
                    font-weight: 500;
                }
                
                @media screen and (min-width: 576px) {
                    .properties-title-text {
                        font-size: 3.6vw;
                    }

                    .properties-text {
                        font-size: 2.4vw;
                    }
                }
                
                @media screen and (min-width: 1200px) {
                    .blob-properties {
                        width: 54vw;
                    }

                    .properties-title-text {
                        font-size: 1.8vw;
                    }

                    .properties-text {
                        font-size: 1.2vw;
                    }
                }

                .divider {
                    background-color: #bbc9ec;
                    height: 1px;
                    opacity: 1.0;
                }
            `}</style>
        </div>
    )
}

const getAsset = (blob : BlobChainAsset ) => {    
    let adCurrency = blob.policy_id;
    let adToken = blob.asset_name;

    // If this is not a production environment, use testnet tokens
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {

        // This is the SundaeSwap Mint test token
        adCurrency = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522";
        adToken = "4d494e54";
    }

    // Mainnet test
    // adCurrency = "e15ffd26ee2409db0cd76a014020125a947d5137a35b70e27bf33bb0";
    // adToken = "74657374";

    return { adCurrency, adToken }
}