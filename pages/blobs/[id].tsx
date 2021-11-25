import { useRouter } from 'next/router'
import { BlobTitle } from '../../src/Elements/BlobElements/BlobTitle'
import { BlobManagement } from '../../src/Elements/BlobElements/BlobManagement'

const BlobDetails = () => 
{
    const router = useRouter()
    const { id } = router.query
  
    const base = 10;
    const parsedId = parseInt(`${id}`, base);
    return (
        <>
            <BlobTitle id={parsedId}/>
            <BlobManagement id={parsedId}/>
        </>
    )
}

export default BlobDetails;