import Link from 'next/link';
import Image from 'next/image';
import { idToLongString } from '../../../utils/idToLongString';
import { convertIPFSToHTTP } from '../../../utils/ipfsToHttp';

export const BlobImage = ({ blob } : { blob: BlobChainAsset }) => 
{
    if (!blob) return <></>;
    
    return (
        <Link href={`/blobs/${blob.asset}`}>
            <div className="blob-content d-flex justify-content-center rounded pb-3 mb-3" >
                <div className="blob-content-inner">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Image src={convertIPFSToHTTP(blob.onchain_metadata.image)} quality={100} width={"400%"} height={"400%"} alt={blob.onchain_metadata.name}  />
                        <div className="blob-name mb-2">{blob.onchain_metadata.name} {idToLongString(blob.onchain_metadata.id)}</div>
                        <button type="button" className="btn btn-primary btn-block">Buy</button>
                    </div>  
                </div>
                <style jsx>{`
                    .blob-content {                        
                        color: #777777;
                        background-color: white;
                        cursor: pointer;                
                    }

                    .blob-content:hover {
                        transform: scale(1.08);
                    }

                    .blob-content-inner {
                        width: 80%;
                    }

                    .btn-block {
                        width: 100%;
                    }

                    .blob-name {
                        font-size: 1.2rem;
                        font-weight: 700;
                        //font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    }

                    .blob-owner {
                        font-size: 1.2rem;
                        font-weight: 900 !important;
                        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
                    }
                `}</style> 
            </div>
        </Link>
    )
}


