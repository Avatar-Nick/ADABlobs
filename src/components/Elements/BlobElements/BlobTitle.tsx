import { blobs } from "../../../consts/blobs"
import { BlobBigImage } from "./BlobBigImage";

export const BlobTitle = ({ blob } : { blob : BlobChainAsset }) => 
{
    return (
        <div className="title-container d-flex align-items-center">            
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                        <BlobBigImage blob={blob} />                        
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692); /*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    min-height: 20rem; 
                    height: 32vw;                   

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }
            `}</style>  
        </div>
    )
}

