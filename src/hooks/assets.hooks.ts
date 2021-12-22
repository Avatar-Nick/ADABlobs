import { useInfiniteQuery, useQuery } from "react-query";
import { fetchAssets, fetchAsset, fetchOwnedAssets, fetchScriptAssets, fetchAssetOwner, fetchAssetAuction, fetchAssetClose } from "../api/requests";
import { getBlobRevealCount } from "../utils/blobs/blobReveal";

const BASE_ASSET_KEY = "assets"

export const useFetchAssets = () => useInfiniteQuery(BASE_ASSET_KEY, fetchAssets, { 
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.curPage < lastPage.maxPage) {
            return lastPage.curPage + 1;
        } 
        return undefined;   
    },
    refetchOnWindowFocus: false
});

export const useFetchAsset = (asset: string) => useQuery([BASE_ASSET_KEY, asset], fetchAsset, { refetchOnWindowFocus: false });

export const useOwnedAssets = () => useQuery(`${BASE_ASSET_KEY}.owned`, fetchOwnedAssets, { refetchOnWindowFocus: false });

export const useScriptAssets = () => useQuery(`${BASE_ASSET_KEY}.script`, fetchScriptAssets, { refetchOnWindowFocus: false });

export const useRevealedAssets = () => useQuery(`${BASE_ASSET_KEY}.revealed`, getBlobRevealCount, { refetchOnMount: false, refetchOnWindowFocus: false });

export const useAssetOwner = (asset: string) => useQuery([`${BASE_ASSET_KEY}.owner`, asset], fetchAssetOwner, { refetchOnWindowFocus: false });

export const useAssetAuction = (asset: string) => useQuery([`${BASE_ASSET_KEY}.auction`, asset], fetchAssetAuction, { refetchOnWindowFocus: false });

export const useAssetClose = (asset: string) => useQuery([`${BASE_ASSET_KEY}.close`, asset], fetchAssetClose, { refetchOnWindowFocus: false });