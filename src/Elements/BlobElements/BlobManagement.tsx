import { AuctionSection } from "../TradeElements/AuctionSection";

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
                    <div className="col-12">
                        <AuctionSection id={id} />
                    </div>
                    <div className="col-12 pt-4">
                        <div className="blob-properties container-fluid rounded">
                            <div className="row justify-content-center">
                                <div className=" col-12 blob-properties-title rounded mt-4">
                                    <h2 className="">Blob Rarity / Info</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center pt-3">
                            <div className="col-3"></div>
                                <div className="col-4 blob-properties-text">
                                    Category
                                </div>
                                <div className="col-5 blob-properties-text">
                                    Blue
                                </div>
                                <div className="col-3"></div>
                                <div className="col-4 blob-properties-text">
                                    Id
                                </div>
                                <div className="col-5 blob-properties-text">
                                  #001
                                </div>
                                <div className="col-3"></div>
                                <div className="col-4 blob-properties-text">
                                    Name
                                </div>
                                <div className="col-5 blob-properties-text">
                                    Bob
                                </div>                                
                                <div className="col-3"></div>
                                <div className="col-4 blob-properties-text">
                                    Hex Color
                                </div>
                                <div className="col-5 blob-properties-text">
                                  #888888
                                </div>
                                <div className="col-3"></div>
                                <div className="col-4 blob-properties-text">
                                    Release Date
                                </div>
                                <div className="col-5 blob-properties-text">
                                  December 4th, 2021
                                </div>                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: white;
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
                    font-weight: 500;
                }

                .blob-management {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec;

                    width: 54vw;
                    height: 27vw;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
                }

                .blob-properties {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 1px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 54vw;
                    height: 20vw;

                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
                }

                .blob-properties h2 {
                    font-weight: 700;
                    margin-bottom: 0;
                }

                .blob-properties-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background-color: #edf0f6;

                    width: 20vw;
                    height: 4vw;
                }

                .blob-properties-text {
                    font-weight: 500;
                    font-size: 1.6rem;
                }
            `}</style>
        </div>
    )
}
