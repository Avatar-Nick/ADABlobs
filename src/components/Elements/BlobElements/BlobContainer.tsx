
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlobImage } from "./BlobImage";

export const BlobContainer = ({ blobData } : any) => 
{
    const [blobs, setBlobs] = useState([]); 
    const router = useRouter();   
    
    useEffect(() => 
    {
        if (blobData) {
            if (blobData.error) {
                console.error(blobData.error);
            }
            else {
                setBlobs(blobData.blobs)
            }
        }       
    }, [blobData])

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    const handleScroll = () => {
        console.log('test');
        // To get page offset of last blob
        const lastBlobLoaded = document.querySelector(
            ".blob-list > .blob:last-child"
        ) as HTMLElement

        console.log(lastBlobLoaded);
        if (lastBlobLoaded) {
            const lastBlobLoadedOffset = lastBlobLoaded.offsetTop + lastBlobLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;

            console.log('lastBlobLoadedOffset', lastBlobLoadedOffset);
            console.log('pageOffset', pageOffset);

            // Detects when the user scrolls down till the last blob
            if (pageOffset >= lastBlobLoadedOffset) {

                console.log('testing here');
                console.log(blobData.curPage);
                console.log(blobData.maxPage);

                // Stops loading
                if (blobData.curPage < blobData.maxPage) {

                    // Trigger Fetch
                    const query = router.query;
                    query.page = (parseInt(blobData.curPage) + 1).toString();
                    router.push({
                        pathname: router.pathname,
                        query: query,
                    })

                }
            }
        }
    }

    return (
        <div className="blob-container">
            <div className="blob-content container pt-3">
                <div className="blob-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {blobs.length > 0 && blobs.map((blob, i) =>  
                    <div className="blob col" key={i}>
                        <BlobImage blob={blob}/>             
                    </div> 
                    )}
                </div>
            </div>

            <style jsx>{`
                .blob-container {
                    background-color: #ececec;
                }

                .blob-content {
                    max-width: 100rem;
                    padding-right: 8%;
                    padding-left: 8%;
                }
            `}</style>
        </div>
    )
}
