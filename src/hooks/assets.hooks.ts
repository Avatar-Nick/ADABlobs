import { useInfiniteQuery } from "react-query";
import { fetchAssets } from "../api/api";

const BASE_ASSET_KEY = "assets"

export const useFetchAssets = () => useInfiniteQuery(`${BASE_ASSET_KEY}`, fetchAssets, { getNextPageParam: (lastPage : any, pages: any) => lastPage.nextCursor,});
