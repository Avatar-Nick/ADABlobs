export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer-container container-fluid d-flex flex-column justify-content-end align-items-center">            
            {/*
            <div className="row">
                <hr className="divider" />
            </div>
            */}            
            <div className="row pb-2">
                <div className="copyright">&copy; Copyright {currentYear}, ADA Blobs</div>
            </div>
            <style jsx>{`
                .footer-container {
                    background-color: #1e5692;
                    color: white;

                    width: 100%;
                    height: 4rem;

                    font-size: 2rem;
                    font-weight: 700;
                }

                .copyright {
                    /*text-align: center;*/

                    font-size: 0.8rem;
                }

                .divider {
                    background-color: white; /*#bbc9ec;*/
                    height: 1px;
                    width: 1000px;
                    opacity: 1.0;
                }
            `}</style>
        </footer >
    )
}