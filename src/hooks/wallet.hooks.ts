import { useQuery } from "react-query";
import { getAddress, isConnected } from "../cardano/wallet/wallet";

const BASE_WALLET_KEY = "wallet"

export const useIsConnected = () => useQuery(`${BASE_WALLET_KEY}.isConnected`, isConnected);

export const useGetAddress = () => useQuery(`${BASE_WALLET_KEY}.address`, getAddress);