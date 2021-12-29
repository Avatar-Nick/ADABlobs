import Head from 'next/head'

import { FAQContainer } from "../src/components/Elements/FAQ/FAQContainer"

const FAQ = () =>
{
    return (
        <>         
            <Head>
                <meta name="description"
                      content="This cute and adorable ADA Blob is part of a collection of 300 pet blob NFTs on the Cardano blockchain." />
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <FAQContainer />
        </>
    )
}

export default FAQ;
