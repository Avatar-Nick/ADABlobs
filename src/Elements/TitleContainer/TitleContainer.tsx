import Image from 'next/image'

export const TitleContainer = () => 
{
    return (
        <div className="title-container d-flex align-items-center">            
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <h1>Start Your Blob</h1>
                        <h1>Collection!</h1>
                        <p>
                            Launched on Octorber 31st, 2021, ADA Blobs is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                            with 1 new Blob being available each week until all 300 are revealed. 
                        </p>
                    </div>
                    <div className="col-2">
                        <div>
                            <img className="first-image-width" src="/images/blobs/001 - Bob.png" height={"125%"} width={"125%"} />                        
                        </div>                        
                    </div>
                    <div className="col-2">
                        <div>
                            <img className="second-image-width" src="/images/YolgReverse.png" height={"125%"} width={"125%"} />                        
                        </div>
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692); /*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    min-height: 32rem;

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                /*
                .title-row {
                    height: 100%;
                }
                */

                h1 {
                    font-size: 6.2vw;
                    font-weight: 700;
                }

                p {
                    color: #ecf3fa;
                    font-size: 1.2rem;
                    font-weight: 500;
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
                    left: -10%;
                    right: -10%;
                    margin-left: -3vw;
                    margin-right: -3vw;
                }

                .second-image-width {
                    position: relative;
                    width: 15vw;
                    max-width: 15vw;
                    top: 10vw;
                    left: -10%;
                    right: -10%;
                    margin-left: -3vw;
                    margin-right: -3vw;
                }
            `}</style>  
        </div>
    )
}

