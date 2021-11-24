export const TitleContainer = () => 
{
    return (
        <div className="title-container container-fluid">            
            <div className="d-flex align-items-center">
            
                {/*
                <h1>Start Your Blob</h1>
                <h1>Collection!</h1>
                <p>
                    Launched on Octorber 31st, 2021, ADA Blobs is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                    with 1 new Blob being available each week until all 300 are revealed. 
                </p>
                <img height={"40%"} width={"40%"} src="images/blobs/Bob.png" />
            
                */}
            </div>  
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);/*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    height: 40rem;

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                /*
                .title-row {
                    height: 100%;
                }
                */

                h1 {
                    font-size: 6.5vw;
                    font-weight: 700;
                }

                p {
                    color: #ecf3fa;
                    font-size: 1.2rem;
                    font-weight: 500;
                }
            `}</style>  
        </div>
    )
}

