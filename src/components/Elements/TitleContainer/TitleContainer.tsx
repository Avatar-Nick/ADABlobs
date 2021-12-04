import { connect } from "../../../cardano/wallet/wallet";
import { useIsConnected } from "../../../hooks/wallet.hooks";

export const TitleContainer = () => 
{
    const { isLoading, error, data} = useIsConnected();
    let connected = data;
    return (
        <div className="title-container d-flex align-items-center">            
            <div className="container">
                <div className="row d-flex d-md-none">
                    <div className="col-12">
                        <img src="/images/blobs/001 - Bob.png" height={"100%"} width={"100%"} />  
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
                            with 1 new adorable and memeable Blob being available each week until all 300 are revealed. 
                        </p>
                    </div>
                    <div className="col-2">
                        <div className="d-none d-lg-block">
                            <img className="first-image-width" src="/images/blobs/001 - Bob.png" height={"125%"} width={"125%"} />                        
                        </div>
                        <div className="d-block d-lg-none">
                            <img className="first-image-width-small" src="/images/blobs/001 - Bob.png" height={"125%"} width={"125%"} />                        
                        </div>                    
                    </div>
                    <div className="col-2 d-none d-lg-block">
                        <div>
                            <img className="second-image-width" src="/images/YolgReverse.png" height={"125%"} width={"125%"} />                        
                        </div>
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692); /*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    min-height: 20rem;                    

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

                @media screen and (min-width: 996px) {
                    h1 {
                        font-size: 6.2vw;
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

                .position-first-blob {
                    position: absolute;
                    top: -2rem;
                }

                .position-second-blob {
                    position: absolute;
                    top: 10rem;
                }

                .first-image-width {
                    position: relative;
                    width: 15vw;
                    max-width: 15vw;
                    top: -2vw;
                    left: -5%;
                    right: -5%;
                    margin-left: 0vw;
                    margin-right: 0vw;
                }

                .first-image-width-small {
                    position: relative;
                    width: 25vw;
                    max-width: 25vw;
                    top: 2vw;
                    left: 0%;
                    right: 0%;
                    margin-left: 0vw;
                    margin-right: 0vw
                }

                .second-image-width {
                    position: relative;
                    width: 15vw;
                    max-width: 15vw;
                    top: 8vw;
                    left: -10%;
                    right: -10%;
                    margin-left: 0vw;
                    margin-right: 0vw;
                }

                .nav-button-text {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-weight: 700;
                }
            `}</style>  
        </div>
    )
}

