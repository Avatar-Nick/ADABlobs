import Image from 'next/image';
import Link from 'next/link';
import { GuideBox } from './GuideBox';

export const GuideContainer = () => 
{
    return (
        <div className="title-container pt-4">
            <div className='d-flex flex-column align-items-center'>
                <div className='row'>
                    <h1 className='guide-title pb-4'>How To Use ADA Blobs</h1>
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Get the <Link href="/"><a className='guide-link'>Nami Wallet</a></Link> to connect to the Blob marketplace.</span>} 
                        imageElement={<Image src="/images/blobs/001 - Bob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={true}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Fund the wallet with <strong>ADA (₳)</strong> and add collateral in the Nami Wallet user interface.</span>} 
                        imageElement={<Image src="/images/blobs/007 - Yolg - Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={false}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Click the &quot;<strong>Connect Wallet</strong>&quot; in top right corner to connect your Nami Wallet to ADA Blobs!</span>} 
                        imageElement={<Image src="/images/blobs/008 - Glob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={true}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>You can now:
                            <ul>
                                <li>
                                    <strong>Bid</strong> for any blobs that are up for auction on the homepage!
                                </li>
                                <li>
                                    <strong>Auction</strong> off any blobs that your wallet owns!
                                </li>
                            </ul>
                             
                            </span>} 
                        imageElement={<Image src="/images/blobs/005 - Rooboo - Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={false}                    
                    />
                </div>         
            </div>            
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);                
                    min-height: 91.3vh;
                }

                .guide-title {
                    color: #e9f1fa;

                    font-size: 7vw;
                    font-weight: 700;                    
                }

                .guide-link {
                    text-decoration: none;
                    font-weight: 700;
                }

                @media screen and (min-width: 576px) {
                    .guide-title {
                        font-size: 5vw;                  
                    }
                }

                @media screen and (min-width: 992px) {
                    .guide-title {
                        font-size: 3vw;                 
                    }
                }

            `}</style>  
        </div>
    )
}

