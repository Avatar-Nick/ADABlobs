import Head from 'next/head'

import { TitleContainer } from "../src/components/Elements/TitleContainer/TitleContainer"
import { BlobContainer } from "../src/components/Elements/BlobElements/BlobContainer"

const ADABlobs = () =>
{
    return (
        <>         
            <Head>
                <meta name="description"
                      content="Launched in December 2021, ADA Blobs is a collection of 300 Blob NFTs 
                               and is the first auction NFT project on the Cardano Blockchain. 
                               There will only ever be 300 ADA Blobs available, with 1 new adorable 
                               and memeable Blob being available each week until all 300 are revealed." />
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <TitleContainer />            
            <BlobContainer />
        </>
    )
}

export default ADABlobs;
