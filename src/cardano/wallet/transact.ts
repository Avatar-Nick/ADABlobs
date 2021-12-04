import Loader from '../loader';
import { isConnected } from "./connect";
import { fromHex, toHex, toBytesNum, fromAscii  } from "../serialization";

import { blockfrostAPI } from '../../api/api';
import { blockfrostRequest } from "../../api/requests";

import { CONTRACT, GIVE } from "../contract";

export const transact = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) return;
        if (!isConnected()) return;

        await Loader.load();

        console.log(process.env);
        const addressEndpoint = blockfrostAPI.endpoints.specificAddress('addr1q825x5678w6elkkrn8paxv4m4h92lv4x37yd6p0klku5s62z2ht8hx6s62gpxnjhwpjhxh9srzv7mzdtlf3kttzvmf3qnd0v7f')
        const test = await blockfrostRequest(addressEndpoint);
        console.log('response', test);

    }
    catch (error) {
        console.error(error);
        return;
    }    
}