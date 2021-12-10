import Link from 'next/link';
import Image from 'next/image';
import { BlobStatus } from '../../../types/enum';
import { idToLongString } from '../../../utils/idToLongString';
import { convertIPFSToHTTP } from '../../../utils/ipfsToHttp';

interface BlobImageProps  {
    blob: BlobChainAsset,
    blobStatus: BlobStatus,

}
export const BlobImage = ({ blob, blobStatus = BlobStatus.Waiting } : BlobImageProps) => 
{
    if (!blob) return <></>;
    
    return (
        <Link href={`/blobs/${blob.asset}`} passHref>
            <div className="blob-content d-flex justify-content-center rounded pb-4 mb-4" >
                <div className="blob-content-inner">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Image src={convertIPFSToHTTP(blob.onchain_metadata.image)} quality={100} width={"400%"} height={"400%"} alt={blob.onchain_metadata.name}  />
                        <div className="blob-name mb-2">{blob.onchain_metadata.name} {idToLongString(blob.onchain_metadata.id)}</div>
                        <>
                            { blobStatus === BlobStatus.Waiting && <></>}
                            { blobStatus === BlobStatus.Sold && <button type="button" className="btn btn-shade btn-block btn-text">Sold</button>}
                            { blobStatus === BlobStatus.Bid && <button type="button" className="btn btn-success btn-block btn-text">Bid</button>}
                            { blobStatus === BlobStatus.Buy && <button type="button" className="btn btn-success btn-block btn-text">Buy</button>}
                            { blobStatus === BlobStatus.Sell && <button type="button" className="btn btn-danger btn-block btn-text">Sell</button>}
                            { blobStatus === BlobStatus.Auction && <button type="button" className="btn btn-danger btn-block btn-text">Auction</button>}
                        </>
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
                        font-weight: 700;}

                    .btn-shade {
                        background-color: #3d4142;
                        color: white;
                    }

                    .btn-text {
                        font-weight: 700;
                    }
                `}</style> 
            </div>
        </Link>
    )
}
