import { BlobImage } from "./BlobImage"

export const BlobContainer = () => 
{
    return (
        <div className="container-fluid blob-content alert alert-secondary pt-3 mt-4 mb-4">
            <div className="row row-cols-3">
                <div className="col">
                    <BlobImage/>
                </div> 
            </div>

            <style jsx>{`
                .blob-content {
                    width: 80%;
                    border: 0.15rem solid #1e5692;    
                }
            `}</style>
        </div>
    )
}
