export const BlobManagement = ({ id } : { id : number}) => 
{
    const test = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return (
        <div className="blob-container">
            <div className="blob-content container d-flex flex-column align-items-center">
                <div className="row pt-4 pb-4">
                    <div className="col-12">
                        <div>
                            <button type="button" className="btn btn-lg btn-owner">Owner: addr1q9s8...zjsdvf26q</button>
                        </div>
                    </div>
                </div>
                <div className="row pb-4">
                    <div className="col-6">
                        <div className="blob-management rounded">
                            Last Sale
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="blob-properties container-fluid rounded">
                            <div className="row justify-content-center">
                                <div className=" col-12 blob-properties-title rounded mt-4">
                                    <h2 className="">Blob Properties</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    Hello
                                </div>   
                                <div className="col-12">
                                    Hello
                                </div>   
                                <div className="col-12">
                                    Hello
                                </div>   
                                <div className="col-12">
                                    Hello
                                </div>   
                                <div className="col-12">
                                    Hello
                                </div>                                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: #E7E8E9;
                }

                .blob-content {
                    max-width: 100rem;
                    //width: 80%;
                    padding-right: 8%;
                    padding-left: 8%;
                }

                .btn-owner {
                    background-color: #0a2e53;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

                .blob-management {
                    background-color: #f4f4f4;
                    color: #0a2e53;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 

                    width: 33vw;
                    height: 27vw;
                }

                .blob-properties {
                    background-color: #f4f4f4;
                    color: #0a2e53;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 

                    width: 33vw;
                    height: 27vw;
                }

                .blob-properties h2 {
                    font-weight: 700;

                    margin-bottom: 0;
                }

                .blob-properties-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background-color: #E7E8E9;

                    width: 20vw;
                    height: 4vw;
                }

                
            `}</style>
        </div>
    )
}
