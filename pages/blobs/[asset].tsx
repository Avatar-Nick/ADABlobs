import { useRouter } from 'next/router'
import { BlobTitle } from '../../src/components/Elements/BlobElements/BlobTitle'
import { BlobManagement } from '../../src/components/Elements/BlobElements/BlobManagement'
import { useFetchAsset } from '../../src/hooks/assets.hooks'

const BlobDetails = () => 
{
    const router = useRouter()
    const { asset } = router.query    

    const { data }  = useFetchAsset(asset as string);
    if (!asset || !data) return <></>
    return (
        <>
            <BlobTitle blob={data}/>
            <BlobManagement blob={data}/>
        </>
    )
}

export default BlobDetails;