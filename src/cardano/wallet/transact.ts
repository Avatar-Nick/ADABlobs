import Loader from '../loader';
import { isConnected, getAddress, getBalance, getUtxos, getBaseAddress, getNetworkId } from "./wallet";
import { fromHex, toHex, toBytesNum, fromAscii  } from "../serialization";

import { blockfrostAPI } from '../../api/api';
//import { blockfrostRequest } from "../../api/requests";

import { CONTRACT, GIVE } from "../plutus/contract";
import { blockfrostAPIRequest } from '../../api/requests';

export const transact = async () => 
{    
    const cardano = window.cardano;
    console.log('cardano', cardano);

    //const balance = await getBalance();
    //console.log(balance);
    
    
    //const address = Loader.Cardano.Address.from_bytes(fromHex(changeAddress));
    //const baseAddress = Loader.Cardano.BaseAddress.from_address(address);

    const balance = await getBalance();
    const address = await getAddress();
    const baseAddress = await getBaseAddress();
    const utxos = await getUtxos();
    const networkId = await getNetworkId();

    console.log('balance', balance);
    console.log('address', address);
    console.log('baseAddress', baseAddress.to_address());
    console.log('utxos', utxos);
    console.log('networkId', networkId);
    

    /*
    const addressEndpoint = blockfrostAPI.endpoints.address('addr1q825x5678w6elkkrn8paxv4m4h92lv4x37yd6p0klku5s62z2ht8hx6s62gpxnjhwpjhxh9srzv7mzdtlf3kttzvmf3qnd0v7f')
    const test = await blockfrostAPIRequest(addressEndpoint);
    console.log('response', test);
    */
}