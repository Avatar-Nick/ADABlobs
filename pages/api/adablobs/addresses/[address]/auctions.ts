import { NextApiRequest, NextApiResponse } from "next";
import { blockfrostAPI } from "../../../../../src/api/api";
import { blockfrostAPIRequest, fetchTxMetadata } from "../../../../../src/api/requests";
import data from '../../../../../public/data/blobs.json';
import Loader from '../../../../../src/cardano/loader';
import { BIDDER_ADDRESS_LABEL, DATUM_LABEL, SELLER_ADDRESS_LABEL } from "../../../../../src/cardano/wallet/transact";
import { arrayToBytes, getAuctionDatum } from "../../../../../src/cardano/plutus/utils";
import { fromHex } from "../../../../../src/cardano/serialization";
import { getTestBidData, getTestCloseData } from "../../../../../public/data/testData";

/*
    Get all auctions for blobs
    1: Get all utxos at script address
    2: If there are blobs at ascript address get the datum from the utxo
    3: Return object where the blob is the key and datum is the value. This will give timer and bid
*/
const handler = async (req : NextApiRequest, res : NextApiResponse) =>
{
    if (!Loader.Cardano) {
        await Loader.load();
    }

    const { address } = req.query
    
    const endpoint = blockfrostAPI.endpoints.addresses.utxos.base(address);
    const utxos = await blockfrostAPIRequest(endpoint);

    const blobData : { [asset: string]: BlobChainAsset } = data;
    const outputData : any = {};
    for (let i = 0 ; i < utxos.length; i++) {
        const utxo: any = utxos[i];
           
        // If the utxo has an asset get the metadata
        let asset = "";
        let hasAsset = false;
        for (let j = 0; j < utxo.amount.length; j++) {
            asset = utxo.amount[j].unit;
            if (isAssetInUtxo(asset, blobData)) {
                hasAsset = true;
                break;
            }
            asset = ""; // return asset to an empty string if it is not in blobData
        }

        let datum = null;
        let sellerAddress = null;
        let bidderAddress = null;
        if (hasAsset) {
            const metadata = await fetchTxMetadata(utxo.tx_hash);            
            const datumArray = metadata.find((m: any) => m.label == DATUM_LABEL).json_metadata[utxo.output_index];
            datum = arrayToBytes(datumArray);
            datum = Loader.Cardano.PlutusData.from_bytes(fromHex(datum));             
            datum = getAuctionDatum(datum);
            if (!datum) {
                continue;
            }
            
            const sellerAddressMetadata = metadata.find((m: any) => m.label == SELLER_ADDRESS_LABEL);
            if (sellerAddressMetadata) {
                sellerAddress = sellerAddressMetadata.json_metadata.address.slice(2);
                sellerAddress = Loader.Cardano.Address.from_bytes(fromHex(sellerAddress)).to_bech32();
            }

            const bidderAddressMetadata = metadata.find((m: any) => m.label == BIDDER_ADDRESS_LABEL);
            if (bidderAddressMetadata) {
                bidderAddress = bidderAddressMetadata.json_metadata.address.slice(2);
                bidderAddress = Loader.Cardano.Address.from_bytes(fromHex(bidderAddress)).to_bech32();
            }            
            outputData[asset] = { datum, sellerAddress, bidderAddress };
        }
    }

    // Testnet Code
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6232'] = getTestBidData();
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6233'] = getTestBidData();
        outputData['4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318414441426c6f6234'] = getTestCloseData();
    }

    res.status(200).json(outputData);
}

export default handler;

const isAssetInUtxo = (asset : string, blobData : { [asset: string]: BlobChainAsset }) => {

    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
        // This is the SundaeSwap Mint test token
        return asset === "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54";
    }

    return asset in blobData;
}