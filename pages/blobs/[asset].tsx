import { useRouter } from 'next/router'
import { BlobTitle } from '../../src/components/Elements/BlobElements/BlobTitle'
import { BlobManagement } from '../../src/components/Elements/BlobElements/BlobManagement'
import { useFetchAsset } from '../../src/hooks/assets.hooks'
import Head from 'next/head'

const BlobDetails = () => 
{
    const router = useRouter()
    const { asset } = router.query    

    const { data }  = useFetchAsset(asset as string);
    if (!asset || !data) return <></>
    return (
        <>
            <Head>
                <meta name="description"
                      content={`This cute and adorable ADA Blob is part of a collection of 300 
                               pet blob NFTs on the Cardano blockchain.`} />
            </Head>
            <BlobTitle blob={data}/>
            <BlobManagement blob={data}/>
        </>
    )
}

export default BlobDetails;