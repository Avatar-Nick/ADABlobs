import Loader from '../loader';
import WalletAPI from './wallet';
import CardanoBlockchain from '../cardanoBlockchain';
import CoinSelection from '../CoinSelection';
import { fromHex, toHex } from '../serialization';
import { fee } from '../consts';
import { CONTRACT, MARKETPLACE_ADDRESS } from '../plutus/contract';
import { bytesToArray, getAuctionDatum, getAuctionRedeemer } from '../plutus/utils';
import { fetchCurrentSlot } from '../../api/requests';

export const DATUM_LABEL = 405;
export const SELLER_ADDRESS_LABEL = 406;
export const BIDDER_ADDRESS_LABEL = 407;

const languageViews =
  "a141005901d59f1a000302590001011a00060bc719026d00011a000249f01903e800011a000249f018201a0025cea81971f70419744d186419744d186419744d186419744d186419744d186419744d18641864186419744d18641a000249f018201a000249f018201a000249f018201a000249f01903e800011a000249f018201a000249f01903e800081a000242201a00067e2318760001011a000249f01903e800081a000249f01a0001b79818f7011a000249f0192710011a0002155e19052e011903e81a000249f01903e8011a000249f018201a000249f018201a000249f0182001011a000249f0011a000249f0041a000194af18f8011a000194af18f8011a0002377c190556011a0002bdea1901f1011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000242201a00067e23187600010119f04c192bd200011a000249f018201a000242201a00067e2318760001011a000242201a00067e2318760001011a0025cea81971f704001a000141bb041a000249f019138800011a000249f018201a000302590001011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a00330da70101ff";

export const initializeTransaction = async () => 
{
    const txBuilder = Loader.Cardano.TransactionBuilder.new(
        Loader.Cardano.LinearFee.new(
            Loader.Cardano.BigNum.from_str(
                CardanoBlockchain.protocolParameters.linearFee.minFeeA
            ),
            Loader.Cardano.BigNum.from_str(
                CardanoBlockchain.protocolParameters.linearFee.minFeeB
            )
        ),
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.minUtxo),
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.poolDeposit),
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.keyDeposit),
        CardanoBlockchain.protocolParameters.maxValSize,
        CardanoBlockchain.protocolParameters.maxTxSize,
        CardanoBlockchain.protocolParameters.priceMem,
        CardanoBlockchain.protocolParameters.priceStep,
        Loader.Cardano.LanguageViews.new(Buffer.from(languageViews, "hex"))
    )

    const datums = Loader.Cardano.PlutusList.new();
    const metadata = { [DATUM_LABEL]: {}, [SELLER_ADDRESS_LABEL]: {}, [BIDDER_ADDRESS_LABEL]: {} };
    const outputs = Loader.Cardano.TransactionOutputs.new();
    return { txBuilder, datums, metadata, outputs };
}

export const finalizeTransaction = async ({
    txBuilder,
    changeAddress,
    utxos,
    outputs,
    datums,
    metadata,
    scriptUtxo,
    action,
  }: any) => {
    
    // Build the transaction witness set
    const transactionWitnessSet = Loader.Cardano.TransactionWitnessSet.new();

    // Build the transaction inputs using the random improve algorithm
    // Algorithm details: https://input-output-hk.github.io/cardano-coin-selection/haddock/cardano-coin-selection-1.0.1/Cardano-CoinSelection-Algorithm-RandomImprove.html
    //@ts-ignore
    let { input, change } : any = CoinSelection.randomImprove(utxos, outputs, 8, scriptUtxo ? [scriptUtxo] : []);
    input.forEach((utxo: any) => { 
        txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount()); 
    });

    // Build the transaction outputs
    for (let i = 0; i < outputs.len(); i++) 
    {
        txBuilder.add_output(outputs.get(i));
    }

    // Ensure proper redeemers for transaction
    if (scriptUtxo) {
        const redeemers = Loader.Cardano.Redeemers.new();
        const redeemerIndex = txBuilder.index_of_input(scriptUtxo.input()).toString();
        redeemers.add(action(redeemerIndex));
        txBuilder.set_redeemers(
            Loader.Cardano.Redeemers.from_bytes(redeemers.to_bytes())
        );
        txBuilder.set_plutus_data(
            Loader.Cardano.PlutusList.from_bytes(datums.to_bytes())
        );
        txBuilder.set_plutus_scripts(
            CONTRACT()
        );

        const collateral = await WalletAPI.getCollateral();
        if (collateral.length <= 0) throw new Error("Your wallet has no collateral. Ensure your connected wallet has collateral. You can follow the guide page for instructions");
        setCollateral(txBuilder, collateral);

        transactionWitnessSet.set_plutus_scripts(CONTRACT());
        transactionWitnessSet.set_plutus_data(datums);
        transactionWitnessSet.set_redeemers(redeemers);

        // Get the current blockchain slot time
        const currentTime = await fetchCurrentSlot()

        // set_validity_start_interval is the current slot on the cardano blockchain
        txBuilder.set_validity_start_interval(currentTime.slot);

        // ttl is an absolute slot number greater than the current slot. This code sets the ttl to 15 minutes after the current slot
        // Transactions will silently fail and not place a bid if this time window is not before the end of the auction
        txBuilder.set_ttl(currentTime.slot + (15 * 60)); 
    }

    // Attach metadata to the transaction
    let aux_data;
    if (metadata) {
        aux_data = Loader.Cardano.AuxiliaryData.new();
        const generalMetadata = Loader.Cardano.GeneralTransactionMetadata.new();
        Object.keys(metadata).forEach((label) => {
          Object.keys(metadata[label]).length > 0 &&
            generalMetadata.insert(
              Loader.Cardano.BigNum.from_str(label),
              Loader.Cardano.encode_json_str_to_metadatum(
                JSON.stringify(metadata[label]),
                1
              )
            );
        });
        aux_data.set_metadata(generalMetadata);
        txBuilder.set_auxiliary_data(aux_data);
    }

    const changeMultiAssets = change.multiasset();

    // Check if change value is too big for single output
    if (changeMultiAssets && change.to_bytes().length * 2 > CardanoBlockchain.protocolParameters.maxValSize) {
        const partialChange = Loader.Cardano.Value.new(Loader.Cardano.BigNum.from_str("0"));

        const partialMultiAssets = Loader.Cardano.MultiAsset.new();
        const policies = changeMultiAssets.keys();
        const makeSplit = () => {
            for (let j = 0; j < changeMultiAssets.len(); j++) {
                const policy = policies.get(j);
                const policyAssets = changeMultiAssets.get(policy);
                const assetNames = policyAssets.keys();
                const assets = Loader.Cardano.Assets.new();
                for (let k = 0; k < assetNames.len(); k++) {
                    const policyAsset = assetNames.get(k);
                    const quantity = policyAssets.get(policyAsset);
                    assets.insert(policyAsset, quantity);
                    //check size
                    const checkMultiAssets = Loader.Cardano.MultiAsset.from_bytes(partialMultiAssets.to_bytes());
                    checkMultiAssets.insert(policy, assets);
                    const checkValue = Loader.Cardano.Value.new(Loader.Cardano.BigNum.from_str("0"));
                    checkValue.set_multiasset(checkMultiAssets);
                    
                    if (checkValue.to_bytes().length * 2 >= CardanoBlockchain.protocolParameters.maxValSize) 
                    {
                        partialMultiAssets.insert(policy, assets);
                        return;
                    }
                }
                partialMultiAssets.insert(policy, assets);
            }
        };
        makeSplit();
        partialChange.set_multiasset(partialMultiAssets);
        const minAda = Loader.Cardano.min_ada_required(
            partialChange,
            Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.minUtxo)
        );
        partialChange.set_coin(minAda);

        txBuilder.add_output(
            Loader.Cardano.TransactionOutput.new(
            changeAddress.to_address(),
            partialChange
            )
        );
    }

    txBuilder.add_change_if_needed(changeAddress.to_address());

    // Build the full transaction
    const txBody = txBuilder.build();
    const tx = Loader.Cardano.Transaction.new(
        txBody,
        Loader.Cardano.TransactionWitnessSet.from_bytes(
            transactionWitnessSet.to_bytes()
        ),
        aux_data
    );

    // Ensure the transaction size is below the max transaction size for the Cardano Blockchain
    const size = tx.to_bytes().length;
    if (size > CardanoBlockchain.protocolParameters.maxTxSize)
        throw new Error(`The maximum transaction size has been reached: ${CardanoBlockchain.protocolParameters.maxTxSize} bytes. Please contact us in our discord channel for help`);

    let txVKeyWitnesses = await WalletAPI.signTx(tx);
    txVKeyWitnesses = Loader.Cardano.TransactionWitnessSet.from_bytes(
        fromHex(txVKeyWitnesses)
    );
    transactionWitnessSet.set_vkeys(txVKeyWitnesses.vkeys());


    // Sign the transaction
    const signedTx = Loader.Cardano.Transaction.new(
        tx.body(),
        transactionWitnessSet,
        tx.auxiliary_data()
    );    
    
    // Dump hex to read transactions with cardano-cli text-view decode-cbor
    //console.log(toHex(signedTx.to_bytes()));    
    console.log("Full Tx Size: ", signedTx.to_bytes().length);

    const txHash = await WalletAPI.submitTx(signedTx);
    return txHash;
}

// This is the Spacebudz createOutput function (with some updates for ADABlobs to handle multiple addresses) which will build the output of the transaction
export const createOutput = (address : any, value: any, { index, datum, metadata, sellerAddress, bidderAddress }: any = {}) => 
{
    const minAda = Loader.Cardano.min_ada_required(
        value,
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.minUtxo),
        datum && Loader.Cardano.hash_plutus_data(datum)
      );
      
    if (minAda.compare(value.coin()) == 1) value.set_coin(minAda);
    
    const output = Loader.Cardano.TransactionOutput.new(address, value);
    if (datum) {
        output.set_data_hash(Loader.Cardano.hash_plutus_data(datum));
        metadata[DATUM_LABEL][index] = bytesToArray("0x" + toHex(datum.to_bytes()));
    }
    if (sellerAddress) {
        metadata[SELLER_ADDRESS_LABEL].address = "0x" + toHex(sellerAddress.to_address().to_bytes());
    }
    if (bidderAddress) {
        metadata[BIDDER_ADDRESS_LABEL].address = "0x" + toHex(bidderAddress.to_address().to_bytes());
    }
    
    return output;
}

// Split amount according to marketplace fees
export const splitAmount = (lovelaceAmount: any, address: any, outputs: any) => {
    const marketplaceFeeAmount = lovelacePercentage(lovelaceAmount, fee);
    outputs.add(createOutput(MARKETPLACE_ADDRESS(), Loader.Cardano.Value.new(marketplaceFeeAmount)));
    outputs.add(createOutput(address, Loader.Cardano.Value.new(lovelaceAmount.checked_sub(marketplaceFeeAmount))));
}

export const lovelacePercentage = (amount: any, p: any) => 
{
    // Check mul multiplies the value by 10, we then want to divide by 1000 to get 1%
    const scaledFee = (parseInt(p) * 100).toString();
    return amount.checked_mul(Loader.Cardano.BigNum.from_str("10")).checked_div(Loader.Cardano.BigNum.from_str(scaledFee));
};

export const setCollateral = (txBuilder: any, utxos: any) => {
    const inputs = Loader.Cardano.TransactionInputs.new();
    utxos.forEach((utxo: any) => {
        inputs.add(utxo.input());
    });
    txBuilder.set_collateral(inputs);
}