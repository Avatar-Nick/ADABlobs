import { BlobImage } from "./BlobImage";

export const BlobContainer = () => 
{
    const test = [0,1,2,3,4,5,6,7,8,9];
    //const colCount = "row-cols-5";
    return (
        <div className="blob-container">
            <div className="blob-content container-fluid pt-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {test.map((j, i) =>  
                    <div className="col" key={i}>
                        <BlobImage />             
                    </div> 
                    )}
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: #E7E8E9;

                    //font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    //font-weight: 700;
                }

                .blob-content {
                    max-width: 100rem;
                    //width: 80%;
                    padding-right: 8%;
                    padding-left: 8%;
                }
            `}</style>
        </div>
    )
}
