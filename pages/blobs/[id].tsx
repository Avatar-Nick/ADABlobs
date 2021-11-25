import { useRouter } from 'next/router'
import { BlobTitle } from '../../src/Elements/BlobElements/BlobTitle'

const BlobDetails = () => 
{
    const router = useRouter()
    const { id } = router.query
  
    return (
        <BlobTitle id={id}/>
    )
}

export default BlobDetails;