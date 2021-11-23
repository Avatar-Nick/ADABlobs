export const Navbar = () => 
{
    return (
        <div className="blob-container">
            <div className="top-row ps-3 navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">BlazorTest</a>
                    <div>
                        <img width={56} height={56} src="images/Logo.png" />
                        <img width={280} height={56} src="images/LogoText2.png" />
                    </div>
                    <button title="Navigation menu" className="navbar-toggler" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>            

            <style jsx>{`
                .blob-container {
                    background-color: #143f6d;

                    //font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    //font-weight: 700;
                }
            `}</style>
        </div>
    )
}