import Loader from '../loader';
import { fetchScriptAssetUtxos, fetchTxMetadata } from "../../api/requests";
import { ADDRESS_LABEL, DATUM_LABEL } from "../wallet/transact";
import { CONTRACT_ADDRESS } from "./contract";
import { assetsToValue, fromHex, toHex } from '../serialization';
import { getAddress, getBaseAddress } from '../wallet/wallet';
import { blobPolicyId } from '../consts';

// Get's the UTXO associated with a given asset at the script address
/*
    The strategy for this function is to get the utxo at a script
    address for a given asset, and then obtain the relevant datum
    that we place in the metadata for that asset. This strategy
    was initially used in the SpaceBudz contracts.
*/
export const getAssetUtxos = async (asset: string) => {
    const utxos = await fetchScriptAssetUtxos(CONTRACT_ADDRESS().to_bech32(), asset);
    const utxosData = utxos.map(async (utxo: any) => {
        const metadata = await fetchTxMetadata(utxo.tx_hash);
        let datum = null;
        let tradeOwnerAddress = null;
        try {
            const datumArray = metadata.find((m: any) => m.label == DATUM_LABEL).json_metadata[utxo.output_index];
            datum = arrayToBytes(datumArray);

            const tradeOwnerAddressMetadata = metadata.find((m: any) => m.label == ADDRESS_LABEL);
            if (tradeOwnerAddressMetadata) {
                tradeOwnerAddress = tradeOwnerAddressMetadata.json_metadata.address.slice(2);
                tradeOwnerAddress = Loader.Cardano.Address.from_bytes(fromHex(tradeOwnerAddress));
            }
        }        
        catch (e) {
            throw new Error("Some required metadata entries were not found");
        }

        datum = Loader.Cardano.PlutusData.from_bytes(fromHex(datum));
        if (toHex(Loader.Cardano.hash_plutus_data(datum).to_bytes()) !== utxo.data_hash) {
            throw new Error("Datum hash doesn't match");
        }
            
        utxo = Loader.Cardano.TransactionUnspentOutput.new(
            Loader.Cardano.TransactionInput.new(
                Loader.Cardano.TransactionHash.from_bytes(fromHex(utxo.tx_hash)),
                utxo.output_index,
            ),
            Loader.Cardano.TransactionOutput.new(
                CONTRACT_ADDRESS(), assetsToValue(utxo.amount),
            )
        )
        return { datum, tradeOwnerAddress, utxo, asset }            
    });
    return await Promise.all(utxosData);
}

export const getAuctionDatum = (datum: any) : AuctionDatum => 
{
    const rawAuctionDetails = datum.as_constr_plutus_data().data().get(0).as_constr_plutus_data().data();
    const rawBidDetails = datum.as_constr_plutus_data().data().get(1).as_constr_plutus_data().data();

    const adSeller = toHex(Loader.Cardano.Ed25519KeyHash.from_bytes(rawAuctionDetails.get(0).as_bytes()).to_bytes());
    const adCurrency = toHex(rawAuctionDetails.get(1).as_bytes());
    const adToken = toHex(rawAuctionDetails.get(2).as_bytes());
    const adDeadline = rawAuctionDetails.get(3).as_integer().as_u64().to_str();
    const adStartTime = rawAuctionDetails.get(4).as_integer().as_u64().to_str();
    const adMinBid = rawAuctionDetails.get(5).as_integer().as_u64().to_str();
    const adMarketplacePercent = rawAuctionDetails.get(6).as_integer().as_u64().to_str();
    const adMarketplaceAddress = toHex(Loader.Cardano.Ed25519KeyHash.from_bytes(rawAuctionDetails.get(7).as_bytes()).to_bytes());

    const auctionDetails : AuctionDetails = { adSeller, adCurrency, adToken, adDeadline, adStartTime, adMinBid, adMarketplacePercent, adMarketplaceAddress };
    let auctionDatum : AuctionDatum = { adAuctionDetails: auctionDetails };

    if (rawBidDetails.len() > 0) {
        const bdBidder = toHex(Loader.Cardano.Ed25519KeyHash.from_bytes(rawBidDetails.get(0).as_bytes()).to_bytes());
        const bdBid = rawBidDetails.get(1).as_integer().as_u64().to_str();
        const bidDetails: BidDetails = { bdBidder, bdBid }
        auctionDatum['adBidDetails'] = bidDetails;
    }

    return auctionDatum;
}

export const getAuctionRedeemer = (redeemer: any): AuctionRedeemer => 
{
    const rawBidDetails = redeemer.data().as_constr_plutus_data().data();

    const bdBidder = toHex(Loader.Cardano.Ed25519KeyHash.from_bytes(rawBidDetails.get(0).as_bytes()).to_bytes());
    const bdBid = rawBidDetails.get(1).as_integer().as_u64().to_str();
    const bidDetails: BidDetails = { bdBidder, bdBid };
    const auctionRedeemer = { arBidDetails: bidDetails };
    return auctionRedeemer;
}

export const bytesToArray = (datumHex: string) => {
    const datumList = datumHex.match(/.{1,64}/g);
    return datumList;
}

export const arrayToBytes = (metadataArray: [string]) => {
    let datum = "";
    metadataArray.map(item => {
        datum += item;
    })
    datum = datum.slice(2); // Remove 0x which signifies a hex value
    return datum;
}

export const getValueLength = (value: any) =>
{
    if (!value.multiasset()) return 0;

    const policy = Loader.Cardano.ScriptHash.from_bytes(
        Loader.Cardano.Ed25519KeyHash.from_bytes(
          fromHex(blobPolicyId())
        ).to_bytes()
    );
    const length = value.multiasset().get(policy).len();
    return length;
}