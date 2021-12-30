import { FAQAccordion } from './FAQAccordion';

export const FAQContainer = () => 
{
    return (
        <div className="title-container d-flex justify-content-center pt-4">            
            <div className='faq-container d-flex flex-column align-items-center'>
                <div className='row'>
                    <h1 className='faq-title pb-4'>Frequently Asked Questions</h1>
                </div>
                <div className='row w-100'>
                    <FAQAccordion />
                </div>              
            </div>            
            <style jsx>{`
                .title-container {
                    background-image: linear-gradient(180deg, #143f6d, #1e5692);                
                    min-height: 91.3vh;
                }

                .faq-container {
                    width: 60vw;
                }

                .faq-title {
                    color: #e9f1fa;

                    font-size: 7vw;
                    font-weight: 700;                    
                }

                @media screen and (min-width: 576px) {
                    .faq-title{
                        font-size: 5vw;                  
                    }
                }

                @media screen and (min-width: 992px) {
                    .faq-title {
                        font-size: 3vw;                 
                    }
                }
            `}</style>  
        </div>
    )
}

