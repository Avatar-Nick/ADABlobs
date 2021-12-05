import { useQuery } from "react-query";

const BASE_ASSET_KEY = "assets"

export const useGetAssets = () => useQuery(`${BASE_ASSET_KEY}`, isConnected);

const getAssets = async () => {
    try {
        if (typeof window === "undefined") return false;

        const cardano = window.cardano;
        if (!cardano) return false;
    
        return await cardano.isEnabled();
    }
    catch (error) {
        console.error(error);
        return false;
    }
}