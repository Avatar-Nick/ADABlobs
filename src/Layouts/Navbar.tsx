import Link from 'next/link'

export const Navbar = () => 
{
    return (
        <div className="blob-container">
            <div className="top-row ps-3 navbar navbar-dark">
                <div className="container-fluid d-flex">
                    <div className="navbar-header me-auto p-2">
                        <Link href="/">                    
                            <a className="navbar-brand">
                                <img width={56} height={56} src="images/Logo.png" />
                                <img width={260} height={56} src="images/LogoText.png" />
                            </a>
                        </Link>
                    </div>
                    <div className="p-2 pe-4">
                        <Link href="/">
                            <div>
                                <a className="nav-link test-color" href="/">Guide</a>
                            </div>
                        </Link>
                    </div>
                    <div className="p-2 pe-4">
                        <Link href="/">
                            <div>
                                <a className="nav-link test-color" href="/">FAQ</a>
                            </div>
                        </Link>
                    </div>

                    <div className="p-2 ps-3">
                        <button type="button" className="btn btn-danger btn-lg">Connect Wallet</button>  
                    </div>   
                    
                    {/*
                    <button title="Navigation menu" className="navbar-toggler" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    */}
                    
                </div>
            </div>            

            <style jsx>{`
                .blob-container {
                    background-color: #143f6d;
                    color: white;
                    font-size: 2rem;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-weight: 700;
                }

                .test-color {
                    color: white;
                }
            `}</style>
        </div>
    )
}