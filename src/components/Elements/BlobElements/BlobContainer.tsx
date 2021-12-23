
import React, { useEffect } from "react";
import { BlobImage } from "./BlobImage";
import { useAddressAuctions, useFetchAssets, useOwnedAssets, useRevealedAssets,  } from "../../../hooks/assets.hooks";
import { useGetAddress } from "../../../hooks/wallet.hooks";
import { getBlobStatus } from "../../../utils/blobs/blobStatus";
import { isBlobRevealed, isHomeAddress } from "../../../utils/blobs/blobReveal";
import { getBlobAuctionDatum } from "../../../utils/blobs/blobAuction";

export const BlobContainer = () => 
{
    const addressQuery = useGetAddress();
    const assetsQuery = useFetchAssets();
    const ownedAssetsQuery = useOwnedAssets();
    const addressAuctionsQuery = useAddressAuctions(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string); 
    const revealedAssetsQuery = useRevealedAssets();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = assetsQuery;
    
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

        if (lastBlobLoaded) {
            const lastBlobLoadedOffset = lastBlobLoaded.offsetTop + lastBlobLoaded.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;

            // Detects when the user scrolls down till 80% of the height to last blob
            if (pageOffset >= (lastBlobLoadedOffset * 0.8) && hasNextPage && !isFetchingNextPage) {
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
                            {group.blobs.map((blob : BlobChainAsset) => {
                                if (isBlobRevealed(blob, revealedAssetsQuery.data) || isHomeAddress(addressQuery.data))  {
                                    const blobStatus = getBlobStatus(blob, ownedAssetsQuery.data, addressAuctionsQuery.data);
                                    const blobAuctionDatum : AuctionDatum = getBlobAuctionDatum(blob, addressAuctionsQuery.data) as AuctionDatum;
                                    return (
                                        <div className="blob col" key={blob.asset}>
                                            <BlobImage blob={blob} blobStatus={blobStatus} auctionDatum={blobAuctionDatum} />             
                                        </div> 
                                    )
                                }
                                return <div key={blob.asset}></div>
                            })}                      
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