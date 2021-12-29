import Image from 'next/image';
import Link from 'next/link';

interface GuideBoxProps {
    textElement: any;
    imageElement: any;
    contentLeft: boolean;
}
export const GuideBox = ( { textElement, imageElement, contentLeft } : GuideBoxProps) => 
{
    return (
        <div className="guide-container container p-4 mb-4 rounded">            
            {contentLeft ?
            (<div className='row'>
                <div className="col-8 d-flex align-items-center ps-4">
                    {textElement}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    {imageElement}
                </div>
            </div>
            ) : (
            <div className='row'>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    {imageElement}
                </div>
                <div className="col-8 d-flex align-items-center ps-4">
                    {textElement}
                </div>
            </div> )}
            <style jsx>{`
                .guide-container {
                    background-color: #e9f1fa;
                    color: #0a2e53;

                    border-width: 5px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                    
                    width: 40vw;
                    font-weight: 500;
                }
            `}</style>  
        </div>
    )
}

