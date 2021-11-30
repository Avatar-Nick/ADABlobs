import { idToLongString } from '../../../utils/idToLongString';

export const BlobBigImage = ({ blob } : { blob: Blob }) => 
{
    //<div className="blob-name mb-2">{blob.name} {idToLongString(blob.id)}</div>
    /// TODO Allow Changing Color Pallete on the big blob section.
    if (!blob) return <></>;

    return (
        <div className="blob-content d-flex justify-content-center align-items-center rounded-3">
            <div className="blob-content-inner">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div></div>
                    <img src={blob.image} width={"100%"} height={"100%"} />
                    <div className="blob-name mb-2">{blob.name} {idToLongString(blob.id)}</div>
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
                
                .blob-content {                        
                    background-color: #0a2e53;
                    color: #777777;

                    width: 80vw;
                    height: 32vh;
                }

                .blob-content-inner {
                    width: 50%;
                }

                .blob-name {                        
                    color: white;

                    font-size: 4.2vw;
                    font-weight: 700;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                @media screen and (min-width: 768px) {
                    .blob-content-inner {
                        width: 27%;
                    }

                    .blob-name {
                        font-size: 2.8vw;
                    }
                }

                @media screen and (min-width: 1200px) {
                    .blob-content {
                        width: 54vw;
                        height: 27vw;
                    }  

                    .blob-content-inner {
                        width: 43%;
                    }

                    .blob-name {
                        font-size: 2.4rem;
                    }
                }
            `}</style>             
        </div>
    )
}