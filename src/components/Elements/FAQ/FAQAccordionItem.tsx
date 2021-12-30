import Link from "next/link"
import Image from 'next/image';


interface FAQAccordionItemProps {
    headerId: string;
    bodyId: string;
    question: string;
    textElement: any;
    imageElement: any;    
    contentLeft: boolean;
}

export const FAQAccordionItem = ( { headerId, bodyId, question, textElement, imageElement, contentLeft }: FAQAccordionItemProps) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={headerId}>
                <button className="header accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${bodyId}`} aria-expanded="true" aria-controls={`${bodyId}`}>
                    {question}
                </button>
            </h2>
            <div className="accordion-collapse collapse" id={bodyId} aria-labelledby={headerId}>
                <div className="body accordion-body container">
                    {contentLeft ?
                        (<div className="row">
                            <div className="col-8 ps-4 d-flex justify-content-center align-items-center">
                                {textElement}
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-center">
                                {imageElement}
                            </div>                        
                        </div>
                        ) : (
                        <div className="row">                        
                            <div className="col-4 d-flex justify-content-center align-items-center">
                                {imageElement}
                            </div> 
                            <div className="col-8 pe-4 d-flex justify-content-center align-items-center">
                                {textElement}
                            </div>                       
                        </div> 
                        )}                       
                </div>
            </div>
            <style jsx>{`
                .header {
                    background-color: #e9f1fa;
                    color: #0a2e53;
                    font-weight: 700;
                }

                .body {
                    background-color: white;
                    color: #0a2e53;
                    font-weight: 500;
                }            
            `}</style>  
        </div>            
    )
}