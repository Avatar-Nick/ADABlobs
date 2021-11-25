import Image from 'next/image'
import { idToLongString } from '../../utils/idToLongString';

export const BlobBigImage = ({ blob } : { blob: Blob }) => 
{
    //<div className="blob-name mb-2">{blob.name} {idToLongString(blob.id)}</div>
    // TODO Allow Changing Color Pallete on the big blob section
    if (!blob) return <></>;

    return (
        <div className="blob-content d-flex justify-content-center align-items-center rounded-3">
            <div className="blob-content-inner">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={blob.image} width={"43%"} height={"43%"} />
                    <div className="blob-name mb-2">{blob.name} {idToLongString(blob.id)}</div>
                </div>  
            </div>
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692); /*linear-gradient(180deg, #143f6d, #1e5692); linear-gradient(180deg, #2CBBE7, #2ea2be);*/
                    min-height: 20rem; 
                    height: 31vw;                   

                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }   
                
                .blob-content {                        
                    background-color: #0a2e53;
                    color: #777777;

                    width: 54vw;
                    height: 27vw;
                }

                .blob-content-inner {
                    width: 90%;
                }

                .blob-name {                        
                    color: white;
                    font-size: 2.4rem;
                    font-weight: 700;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }
            `}</style>             
        </div>
    )
}