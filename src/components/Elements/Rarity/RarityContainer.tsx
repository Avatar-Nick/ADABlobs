import Image from 'next/image';
import Link from 'next/link';
import { RarityBox } from './RarityBox';
import data from '../../../../public/data/blobRarity.json';

export const RarityContainer = () => 
{
    const blobRarity : Rarities = data;
    const blobRarityKeys = Object.keys(blobRarity);
    return (
        <div className="title-container pt-4">
            <div className='d-flex flex-column align-items-center'>
                <div className='row'>
                    <h1 className='rarity-title pb-4'>Blob Rarity</h1>
                </div>
                {blobRarityKeys.map((key, i) => {                        
                    return (
                        <div className='row' key={i}>
                            <RarityBox rarity={blobRarity[key] as Rarity}/>
                        </div>    
                    )
                })}                    
            </div>            
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);                
                    min-height: 91.3vh;
                }

                .rarity-title {
                    color: #e9f1fa;

                    font-size: 7vw;
                    font-weight: 700;                    
                }

                .rarity-link {
                    text-decoration: none;
                    font-weight: 700;
                }

                @media screen and (min-width: 576px) {
                    .rarity-title {
                        font-size: 5vw;                  
                    }
                }

                @media screen and (min-width: 992px) {
                    .rarity-title {
                        font-size: 3vw;                 
                    }
                }
            `}</style>  
        </div>
    )
}

