import Link from 'next/link'

import { connect} from '../../cardano/wallet/connect';
import { useIsConnected } from '../../hooks/wallet.hooks';

export const Navbar = () => 
{    
    const { isLoading, error, data} = useIsConnected();
    let connected = data;
    
    return (
        <div className="blob-container">
            <div className="navbar navbar-dark navbar-expand-md px-3">
                <div className="container-fluid px-2">
                    <div className="navbar-header">
                        <div className="d-none d-sm-flex">
                            <Link href="/">                    
                                <a className="navbar-brand">
                                    <img width={56} height={56} src="/images/Logo.png" />
                                    <img width={260} height={56} src="/images/LogoText.png" />
                                </a>
                            </Link>
                        </div>
                        <div className="d-flex d-sm-none">
                            <Link href="/">                    
                                <a className="navbar-brand">
                                    <img width={42} height={42} src="/images/Logo.png" />
                                    <img width={195} height={42} src="/images/LogoText.png" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="navbarHelp">
                        <div className="pe-4">
                            <Link href="/">
                                <div>
                                    <a className="nav-link" href="/">Guide</a>
                                </div>
                            </Link>
                        </div>
                        <div className="pe-4">
                            <Link href="/">
                                <div>
                                    <a className="nav-link" href="/">FAQ</a>
                                </div>
                            </Link>
                        </div>  
                        <div className="d-none d-md-block ps-3">
                            {!connected ?
                                <button type="button" className="btn btn-danger btn-lg nav-button-text" onClick={connect}>Connect Wallet</button> :
                                <div className="bg-success btn-lg nav-button-text">Connected</div> 
                            }  
                        </div>  
                    </div>
                    
                    {/* TODO THIS REQUIRES JAVASCRIPT TO FUNCTION PERFECTLY */}
                    <div className="pb-3">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarHelp" aria-controls="navbarHelp" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>                   
                    

                    {/*
                    
                    
                    */}
                    
                    
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

                .nav-link {
                    color: white;
                }
                
                .nav-button-text {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-weight: 700;
                }
            `}</style>
        </div>
    )
}