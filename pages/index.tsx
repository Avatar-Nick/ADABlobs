import Head from 'next/head'

import { TitleContainer } from "../src/Elements/TitleContainer/TitleContainer"
import { BlobContainer } from "../src/Elements/BlobElements/BlobContainer"

const ADABlobs = () =>
{
    return (
        <div>            
            <Head>
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TitleContainer />
            <BlobContainer/>    
        </div>
    )
}

export default ADABlobs;
