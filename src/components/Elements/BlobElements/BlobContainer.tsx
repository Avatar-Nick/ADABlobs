
import React, { useEffect, useState } from "react";
import { BlobImage } from "./BlobImage";
import { useFetchAssets } from "../../../hooks/assets.hooks";

export const BlobContainer = () => 
{
    const [page, setPage] = useState(0)
    
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useFetchAssets();

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    const handleScroll = () => {
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
            if (pageOffset >= lastBlobLoadedOffset && (!hasNextPage || isFetchingNextPage)) {
                console.log('fetch');
                fetchNextPage();
            }
        }
    }

    return (
        <div className="blob-container">
            <div className="blob-content container pt-3">
                <div className="blob-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {data?.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.blobs.map((blob : any) => (
                                <div className="blob col" key={blob.asset}>
                                    <BlobImage blob={blob}/>             
                                </div> 
                            ))}                      
                        </React.Fragment>                        
                    ))}
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
