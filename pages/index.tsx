import Head from 'next/head'

import { TitleContainer } from "../src/components/Elements/TitleContainer/TitleContainer"
import { BlobContainer } from "../src/components/Elements/BlobElements/BlobContainer"

const ADABlobs = () =>
{
    return (
        <div>            
            <Head>
                <title>ADA Blobs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TitleContainer />
            <BlobContainer />    
        </div>
    )
}

/*
export const getServerSideProps = async({ query } : { query: any }) =>
{
    const page = query.page || 1;
    let blobData = null;

    try {
        const response = await fetch(`http://localhost:3000/api/adablobs/blobs?page=${page}`)
        if (response.status != 200) {
            throw new Error("Failed to fetch blobs");
        }
        blobData = await response.json();
    }
    catch (error) {
        console.log(error);
        blobData = { error: { message: "Error Fetching Blobs" }};
    }

    return { props: { blobData } }
}
*/

export default ADABlobs;