import { useInfiniteQuery } from "react-query";
import { fetchAssets } from "../api/api";

const BASE_ASSET_KEY = "assets"

export const useFetchAssets = () => useInfiniteQuery(`${BASE_ASSET_KEY}`, fetchAssets, { 
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.curPage < lastPage.maxPage) {
            return lastPage.curPage + 1;
        } 
        return undefined;   
    }
});
