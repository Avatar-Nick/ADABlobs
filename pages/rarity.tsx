import Head from 'next/head'

import { RarityContainer } from "../src/components/Elements/Rarity/RarityContainer"

const Rarity = () =>
{
    return (
        <>         
            <Head>
                <meta name="description"
                      content="This page shows the rarity for various color ADA Blobs. ADA Blobs is a collection of 300 pet blob NFTs on the Cardano blockchain." />
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <RarityContainer />
        </>
    )
}

export default Rarity;
