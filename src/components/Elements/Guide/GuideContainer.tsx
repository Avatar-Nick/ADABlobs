import Image from 'next/image';
import Link from 'next/link';
import { GuideBox } from './GuideBox';

export const GuideContainer = () => 
{
    return (
        <div className="title-container">
            <div className='d-flex flex-column align-items-center'>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Get the <Link href="/"><a className='guide-link'>Nami Wallet</a></Link> to connect to the Blob marketplace.</span>} 
                        imageElement={<Image src="/images/blobs/001 - Bob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={true}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Fund the wallet with ADA (₳) and add collateral in the Nami Wallet user interface.</span>} 
                        imageElement={<Image src="/images/blobs/007 - Yolg - Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={false}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>Click the &quot;Connect Wallet&quot; in top right corner to connect your Nami Wallet to ADA Blobs!</span>} 
                        imageElement={<Image src="/images/blobs/008 - Glob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                        contentLeft={true}                    
                    />
                </div>
                <div className='row'>
                    <GuideBox 
                        textElement={<span>You can now:
                            <ul>
                                <li>
                                    Bid for any blobs that are up for auction on the homepage (Green Button).
                                </li>
                                <li>
                                    Auction off any blobs that your wallet owns (Red Button).
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

                    padding-top: 5rem;
                }

                .guide-link {
                    text-decoration: none;
                    font-weight: 700;
                }
            `}</style>  
        </div>
    )
}

