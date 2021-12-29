import Image from 'next/image';
import Link from 'next/link';
import { RarityBox } from './RarityBox';

export const RarityContainer = () => 
{
    return (
        <div className="title-container pt-4">
            <div className='d-flex flex-column align-items-center'>
                <div className='row'>
                    <h1 className='rarity-title pb-4'>Blob Rarity</h1>
                </div>
                <div className='row'>
                    <RarityBox 
                        textElement={<span>Get the <Link href="/"><a className='rarity-link'>Nami Wallet</a></Link> to connect to the Blob marketplace.</span>} 
                        imageElement={<Image src="/images/blobs/002 - Wumb.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}                    
                    />
                </div>        
            </div>            
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);                
                    min-height: 91.3vh;
                }

                .rarity-title {
                    color: #e9f1fa;

                    font-size: 3vw;
                    font-weight: 700;                    
                }

                .rarity-link {
                    text-decoration: none;
                    font-weight: 700;
                }

            `}</style>  
        </div>
    )
}

