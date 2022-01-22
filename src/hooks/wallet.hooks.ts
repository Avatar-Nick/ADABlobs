import { useQuery } from "react-query";
import WalletAPI from "../cardano/wallet/wallet";

const BASE_WALLET_KEY = "wallet"

export const useIsConnected = () => useQuery(`${BASE_WALLET_KEY}.isConnected`, () => WalletAPI.isConnected());

export const useGetAddress = () => useQuery(`${BASE_WALLET_KEY}.address`, () => WalletAPI.getAddress());