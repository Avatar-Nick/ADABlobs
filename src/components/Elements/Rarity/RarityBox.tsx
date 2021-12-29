import Image from 'next/image';
import Link from 'next/link';

interface RarityBoxProps {
    rarity: Rarity
}
export const RarityBox = ( { rarity } : RarityBoxProps) => 
{
    return (
        <div className="rarity-container container p-4 mb-4 rounded">            
            <div className='row'>
                <div className="col-8 d-flex align-items-start ps-4">
                    <div className='container'>
                        <div className='row'>
                            <h1 className='rarity-title d-flex justify-content-center'>{rarity.color} Blobs</h1>
                        </div>
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="rarity-percent d-flex justify-content-center align-items-center rounded">
                                <span >{rarity.percent}%</span>
                            </div>                            
                        </div>
                        <div className='row pt-2'>
                            <span className='rarity-text'>{rarity.color} Blobs make up <strong>{rarity.percent}% ({rarity.amount}/300)</strong> of all ADA Blobs!</span>
                        </div>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <Image src={rarity.image} quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />
                </div>
            </div>
            <style jsx>{`
                .rarity-container {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 5px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 80vw;
                    font-weight: 500;
                }

                .rarity-title {
                    font-size: 4.6vw;
                    font-weight: 700; 
                    padding-right: 0rem;
                    padding-left: 0rem;
                }

                .rarity-percent {
                    display: block;
                    width: 24vw;
                    height: 12vw;

                    background-color: #143f6d;
                    color: white;

                    border-width: 2px;
                    border-style: solid;
                    border-color: #bbc9ec; 

                    font-size: 4.8vw;
                    font-weight: 700;
                }

                .rarity-text {
                    text-align: center;
                    font-size: 2.5vw;
                    font-weight: 500;
                }

                @media screen and (min-width: 576px) {
                    .rarity-container {                    
                        width: 80vw;
                    }

                    .rarity-title {
                        font-size: 4.5vw;
                    }

                    .rarity-percent {
                        width: 20vw;
                        height: 10vw;
                        font-size: 4.4vw;
                    }

                    .rarity-text {
                        font-size: 2vw;
                    }
                }

                @media screen and (min-width: 992px) {
                    .rarity-container {                    
                        width: 50vw;
                    }

                    .rarity-title {
                        font-size: 2.7vw;
                    }

                    .rarity-percent {
                        width: 11vw;
                        height: 5vw;
                        font-size: 2.6vw;
                    }

                    .rarity-text {
                        font-size: 1vw;
                    }
                }
            `}</style>  
        </div>
    )
}

