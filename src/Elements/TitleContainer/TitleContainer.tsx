export const TitleContainer = () => 
{
    return (
        <div className="title-container container-fluid">
            <div className="title-row row align-items-center">
                <div className="col-1"></div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-10">
                            <h1>Welcome To</h1>
                            <h1>ADA Blobs!</h1>
                        </div>
                        <div className="col-2">
                            <img width={256} height={256} src="images/Bob.png" />
                        </div>
                    </div>
                    <p>
                        Launched on Octorber 31st, 2021, ADA Blobs is one of the first NFT projects on the Cardano Blockchain. There will only ever be 300 ADA Blobs available,
                        with 1 new Blob being available each week until all 300 are revealed. ADA Blobs is built entirely on the Cardano blockchain using a decentralized
                        smart contract to manage everything from buying and selling blobs, the price of Blobs, and the owner.
                    </p>
                    <p>
                        The Blob characters originate from the Youtube channel Avatar Nick where they are used as characters in the various videos and games. 
                        These Blobs are COMPLETELY USELESS beyond being bought and sold, and giving you a strong sense of pride in being the owner of 1 of
                        only 300 Blobs.
                    </p>
                    <p>
                        You can join this Discord Server to discuss the Blobs as well as find people who are buying / selling Blobs.
                    </p>
                    <br />
                    <button type="button" className="btn btn-danger btn-lg">Connect Nami Wallet</button>         
                </div>        
                <div className="col-3"></div>
            </div>  

            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);/*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    height: 40rem;

                    color: white;
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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

