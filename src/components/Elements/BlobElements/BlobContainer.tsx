import { BlobImage } from "./BlobImage";

import { blobs } from "../../../consts/blobs";

export const BlobContainer = () => 
{
    const test = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return (
        <div className="blob-container">
            <div className="blob-content container pt-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {test.map((j, i) =>  
                    <div className="col" key={i}>
                        <BlobImage blob={blobs[i]}/>             
                    </div> 
                    )}
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: #ececec;
                }

                .blob-content {
                    max-width: 100rem;
                    padding-right: 8%;
                    padding-left: 8%;
                }
            `}</style>
        </div>
    )
}
