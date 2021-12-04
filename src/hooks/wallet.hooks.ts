import { useQuery } from "react-query";
import { isConnected } from "../cardano/wallet/connect";

const BASE_WALLET_KEY = "wallet"

export const useIsConnected = () => useQuery(`${BASE_WALLET_KEY}.isConnected`, isConnected);