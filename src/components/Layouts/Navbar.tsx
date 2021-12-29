import Link from 'next/link'
import Image from 'next/image';
import { connect} from '../../cardano/wallet/wallet';
import { useIsConnected } from '../../hooks/wallet.hooks';

export const Navbar = () => 
{    
    const { isLoading, error, data } = useIsConnected();
    let connected = data;
    
    return (
        <div className="blob-container">
            <div className="navbar navbar-dark navbar-expand-md px-3">
                <div className="container-fluid px-2">
                    <div className="navbar-header">
                        <div className="d-none d-sm-flex">
                            <Link href="/">                    
                                <a className="navbar-brand d-flex">
                                    <Image src="/images/Logo.png" width={56} height={56} quality={100} alt="ADABlobs Icon" priority/>
                                    <Image src="/images/LogoText.png" width={260} height={56} quality={100}  alt="ADABlobs Logo" priority/>
                                </a>
                            </Link>
                        </div>
                        <div className="d-flex d-sm-none">
                            <Link href="/">                    
                                <a className="navbar-brand d-flex">
                                    <Image src="/images/Logo.png" width={42} height={42} quality={100} alt="ADABlobs Icon" priority/>
                                    <Image src="/images/LogoText.png" width={195} height={42} quality={100}  alt="ADABlobs Logo" priority/>
                                </a>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="navbarHelp">                        
                        <div className="pe-4">
                            <Link href="/guide" passHref>
                                <div>
                                    <div className="nav-link">Guide</div>
                                </div>
                            </Link>
                        </div>
                        <div className="pe-4">
                            <Link href="/" passHref>
                                <div>
                                    <div className="nav-link">Rarity</div>
                                </div>
                            </Link>
                        </div>
                        <div className="pe-4">
                            <Link href="/" passHref>
                                <div>
                                    <div className="nav-link">FAQ</div>
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
                </div>
            </div>            

            <style jsx>{`
                .blob-container {
                    background-color: #143f6d;
                    color: white;

                    font-size: 2rem;
                    font-weight: 700;
                }

                .nav-link {
                    color: white;
                    cursor: pointer;
                }

                .nav-link:hover {
                    text-decoration: underline;
                }

                .nav-button-text {
                    font-weight: 700;
                }
            `}</style>
        </div>
    )
}