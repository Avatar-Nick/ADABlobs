export const BlobImage = () => 
{
    return (
        <div type="button" className="blob-content rounded pb-3 mb-3" >
            <div className="blob-content-inner">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img height={"100%"} width={"100%"} src="images/blobs/Bob.png" />
                    <div className="blob-name mb-2">Bob #001</div>
                    <button type="button" className="btn btn-primary btn-block">Buy</button>
                </div>  
            </div> 

            <style jsx>{`
                .blob-content {
                    display: flex;
                    justify-content: center;
                    
                    background-color: #f4f4f4;
                    color: #777777;

                }

                .blob-content:hover {
                    background-color: #ececec;
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
    )
}

