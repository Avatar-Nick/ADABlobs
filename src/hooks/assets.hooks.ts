import { useInfiniteQuery, useQuery } from "react-query";
import { fetchAssets, fetchAsset, fetchOwnedAssets, fetchScriptAssets, fetchAssetOwner, fetchAssetAuction } from "../api/requests";
import { getBlobRevealCount } from "../utils/blobs/blobReveal";

const BASE_ASSET_KEY = "assets"

export const useFetchAssets = () => useInfiniteQuery(BASE_ASSET_KEY, fetchAssets, { 
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.curPage < lastPage.maxPage) {
            return lastPage.curPage + 1;
        } 
        return undefined;   
    }
});

export const useFetchAsset = (asset: string) => useQuery([BASE_ASSET_KEY, asset], fetchAsset);

export const useOwnedAssets = () => useQuery(`${BASE_ASSET_KEY}.owned`, fetchOwnedAssets);

export const useScriptAssets = () => useQuery(`${BASE_ASSET_KEY}.script`, fetchScriptAssets);

export const useRevealedAssets = () => useQuery(`${BASE_ASSET_KEY}.revealed`, getBlobRevealCount);

export const useAssetOwner = (asset: string) => useQuery([`${BASE_ASSET_KEY}.owner`, asset], fetchAssetOwner);

export const useAssetAuction = (asset: string) => useQuery([`${BASE_ASSET_KEY}.auction`, asset], fetchAssetAuction);