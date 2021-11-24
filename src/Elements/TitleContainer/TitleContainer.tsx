export const TitleContainer = () => 
{
    return (
        <div className="title-container container-fluid">
            <div className="title-row row align-items-center">
                <div className="col-1"></div>
                <div className="col-8">
                    <h1>Start Your Blob</h1>
                    <h1>Collection!</h1>
                    <p>
                        Launched on Octorber 31st, 2021, ADA Blobs is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                        with 1 new Blob being available each week until all 300 are revealed. 
                    </p>
                    <br />
                </div>        
                <div className="col-3"></div>
            </div>  

            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);/*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    min-height: 10rem;

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                .title-row {
                    height: 100%;
                }

                .title-row h1 {
                    font-size: 6rem;
                    font-weight: 700;
                }

                .title-row p {
                    color: #d3e1f0;
                    font-size: 1.1rem;
                }
            `}</style>  
        </div>
    )
}

