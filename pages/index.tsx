import Head from 'next/head'

import { TitleContainer } from "../src/components/Elements/TitleContainer/TitleContainer"
import { BlobContainer } from "../src/components/Elements/BlobElements/BlobContainer"

const ADABlobs = () =>
{
    return (
        <>         
            <Head>
                <meta name="description"
                      content="ADA Blobs is a collection of 300 Blob NFTs on the Cardano blockchain. 
                               ADA Blobs is the 2nd NFT project on Cardano to utilize smart contracts.
                               There will only ever be 300 ADA Blobs with 1 new adorable pet blob
                               being available for auction each week." />
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <TitleContainer />            
            <BlobContainer />
        </>
    )
}

export default ADABlobs;
