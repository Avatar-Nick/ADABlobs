/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { connect } from "../../../cardano/wallet/wallet";
import { useIsConnected } from "../../../hooks/wallet.hooks";

export const TitleContainer = () => 
{
    const { isLoading, error, data } = useIsConnected();
    let connected = data;
    return (
        <div className="title-container d-flex align-items-center">            
            <div className="container">
                <div className="row d-flex d-md-none">
                    <div className="col-12">
                        <Image src="/images/blobs/001 - Bob.png" width={"100%"} height={"100%"} layout="responsive" quality={100} alt={"Bob"} />  
                    </div>
                </div>
                <div className="row d-flex d-md-none">
                    <div className="col-12">
                        <h1>Start Your Blob</h1>
                        <h1>Collection!</h1>
                        <br />
                        <p className="px-3">
                            Launched on November 30th, 2021, ADA Blobs is a collection of 300 Blob NFTs and is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                            with 1 new adorable and memeable Blob being available each week until all 300 are revealed. 
                        </p>
                    </div>
                </div>
                <div className="row d-flex d-md-none">
                    <div className="col-12 pt-1 pb-4 d-flex justify-content-center">
                        {!connected ?
                            <button type="button" className="btn btn-danger btn-lg nav-button-text" onClick={connect}>Connect Wallet</button> :
                            <div className="bg-success btn-lg nav-button-text">Connected</div> 
                        }  
                    </div> 
                </div>

                <div className="row d-none d-md-flex">
                    <div className="col-8">
                        <h1>Start Your Blob</h1>
                        <h1>Collection!</h1>
                        <p>
                            Launched on November 30th, 2021, ADA Blobs is a collection of 300 Blob NFTs and is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                            with 1 new adorable and memeable pet Blob being available each week until all 300 are revealed. 
                        </p>
                    </div>
                    <div className="col-4">
                        <div className="d-none d-lg-flex h-100">
                            <div className="title-blobs pb-2 pe-2">
                                <Image className="first-image-width" src="/images/blobs/001 - Bob.png" height={"400%"} width={"400%"} quality={100} alt={"Bob"}/>                        
                            </div>
                            <div className="title-blobs align-self-end pt-2 ps-2">
                                <Image className="second-image-width" src="/images/YolgReverse.png" height={"400%"} width={"400%"} quality={100} alt={"Yolg"} />
                            </div>
                        </div>
                        <div className="d-block d-lg-none">
                            <Image className="first-image-width-small" src="/images/blobs/001 - Bob.png" width={"100%"} height={"100%"} layout='responsive' quality={100} alt={"Bob"} />                     
                        </div>               
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .title-blobs {
                    transform: scale(1.3);
                }

                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);
                    min-height: 20rem;                    

                    color: white;
                }

                h1 {
                    font-size: 9.4vw;
                    font-weight: 700;
                    text-align: center;
                }

                p {
                    color: #ecf3fa;
                    font-size: 1.2rem;
                    font-weight: 500;
                }

                @media screen and (min-width: 768px) {
                    .title-container {
                        height: 32vw;
                    }
                    
                    h1 {
                        font-size: 6.0vw;
                        text-align: left;
                    }

                    p {
                        font-size: 0.8rem;
                    }                   
                }                

                @media screen and (min-width: 992px) {
                    h1 {
                        font-weight: 700;
                    }


                    p {
                        font-size: 1.0rem;
                    }                    
                }

                @media screen and (min-width: 1200px) {
                    p {
                        font-size: 1.2rem;
                    }                    
                }

                @media screen and (min-width: 1920px) {
                    h1 {
                        font-size:  5.4vw;
                    }                   
                }

                .nav-button-text {
                    font-weight: 700;
                }
            `}</style>  
        </div>
    )
}

