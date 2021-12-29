import Head from 'next/head'

import { RarityContainer } from "../src/components/Elements/Rarity/RarityContainer"

const Rarity = () =>
{
    return (
        <>         
            <Head>
                <meta name="description"
                      content="This cute and adorable ADA Blob is part of a collection of 300 pet blob NFTs on the Cardano blockchain." />
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <RarityContainer />
        </>
    )
}

export default Rarity;
