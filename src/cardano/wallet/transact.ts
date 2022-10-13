import Loader from '../loader';
import WalletAPI from './wallet';
import CardanoBlockchain from '../cardanoBlockchain';
import { fromHex, toHex } from '../serialization';
import { fee } from '../consts';
import { CONTRACT, MARKETPLACE_ADDRESS } from '../plutus/contract';
import { bytesToArray } from '../plutus/utils';
import { fetchCurrentSlot } from '../../api/requests';

export const DATUM_LABEL = 405;
export const SELLER_ADDRESS_LABEL = 406;
export const BIDDER_ADDRESS_LABEL = 407;

export const initializeTransaction = async () => 
{
    const txBuilder = Loader.Cardano.TransactionBuilder.new(
    Loader.Cardano.TransactionBuilderConfigBuilder.new()
      .fee_algo(
        Loader.Cardano.LinearFee.new(
            Loader.Cardano.BigNum.from_str(
                CardanoBlockchain.protocolParameters.linearFee.minFeeA
            ),
            Loader.Cardano.BigNum.from_str(
                CardanoBlockchain.protocolParameters.linearFee.minFeeB
            )
        )
      )
      .coins_per_utxo_byte(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.coinsPerUtxoByte))
      .pool_deposit(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.poolDeposit))
      .key_deposit(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.keyDeposit))
      .max_value_size(CardanoBlockchain.protocolParameters.maxValSize)
      .max_tx_size(CardanoBlockchain.protocolParameters.maxTxSize)
      .ex_unit_prices(Loader.Cardano.ExUnitPrices.new(
        Loader.Cardano.UnitInterval.new(
            Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceMemNumerator),
            Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceMemDenominator)),
        Loader.Cardano.UnitInterval.new(
            Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceStepNumerator),
            Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceStepDenominator))
      ))
      .prefer_pure_change(true)
      .build());

      // We unfortunately need to create a fake copy transacation as the Cardano
      // Serialization Library does not support coin selection and redeemers. 
      // https://github.com/Emurgo/cardano-serialization-lib/issues/375
      // For some absolutely insane reason you cannot view the tx inputs without building
      // the transaction and you cannot adjust fees after build and rebuild. This library is garbage
      const txBuilderCopy = Loader.Cardano.TransactionBuilder.new(
        Loader.Cardano.TransactionBuilderConfigBuilder.new()
          .fee_algo(
            Loader.Cardano.LinearFee.new(
                Loader.Cardano.BigNum.from_str(
                    CardanoBlockchain.protocolParameters.linearFee.minFeeA
                ),
                Loader.Cardano.BigNum.from_str(
                    CardanoBlockchain.protocolParameters.linearFee.minFeeB
                )
            )
          )
          .coins_per_utxo_byte(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.coinsPerUtxoByte))
          .pool_deposit(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.poolDeposit))
          .key_deposit(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.keyDeposit))
          .max_value_size(CardanoBlockchain.protocolParameters.maxValSize)
          .max_tx_size(CardanoBlockchain.protocolParameters.maxTxSize)
          .ex_unit_prices(Loader.Cardano.ExUnitPrices.new(
            Loader.Cardano.UnitInterval.new(
                Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceMemNumerator),
                Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceMemDenominator)),
            Loader.Cardano.UnitInterval.new(
                Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceStepNumerator),
                Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.priceStepDenominator))
          ))
          .prefer_pure_change(true)
          .build());

    const datums = Loader.Cardano.PlutusList.new();
    const metadata = { [DATUM_LABEL]: {}, [SELLER_ADDRESS_LABEL]: {}, [BIDDER_ADDRESS_LABEL]: {} };
    const outputs = Loader.Cardano.TransactionOutputs.new();
    return { txBuilder, txBuilderCopy, datums, metadata, outputs };
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
    timeToLive = 2 * 60 * 60,
  }: any) => {
    
    // Build the transaction witness set
    const transactionWitnessSet = Loader.Cardano.TransactionWitnessSet.new();

    // Build the transaction outputs
    for (let i = 0; i < outputs.len(); i++) 
    {
        txBuilder.add_output(outputs.get(i));
    }

    const transactionUnspentOutputs = Loader.Cardano.TransactionUnspentOutputs.new();
    for (let i = 0; i < utxos.length; i++) {
        transactionUnspentOutputs.add(utxos[i])
    }
    transactionUnspentOutputs.add(scriptUtxo);
    txBuilder.add_inputs_from(transactionUnspentOutputs, Loader.Cardano.CoinSelectionStrategyCIP2.RandomImproveMultiAsset);
    

    // Ensure proper redeemers for transaction
    if (scriptUtxo) {

        /*
        txBuilder.set_fee(Loader.Cardano.BigNum.from_str("300000"));
        const built = txBuilder.build();
        const builtInputs = built.inputs();

        const scriptTxId = toHex(scriptUtxo.input().transaction_id().to_bytes());
        let redeemerIndex = 0;
        for (let i = 0; i < builtInputs.len(); i++) {
            const curInput = builtInputs.get(i);
            const txId = toHex(curInput.transaction_id().to_bytes());
            if (txId === scriptTxId) {
                redeemerIndex = i;
            }
        }
        */
       console.log(txBuilder);
        const redeemerIndex = txBuilder.index_of_input(scriptUtxo.input()).toString();
        const redeemers = Loader.Cardano.Redeemers.new();
        redeemers.add(action(redeemerIndex));

        const collateral = await WalletAPI.getCollateral();
        const walletAddres = await WalletAPI.getAddress();
        if (collateral.length <= 0) throw new Error("Your wallet has no collateral. Ensure your connected wallet has collateral. You can follow the guide page for instructions");
        setCollateral(txBuilder, walletAddres, collateral);

        transactionWitnessSet.set_plutus_scripts(CONTRACT());
        transactionWitnessSet.set_plutus_data(datums);
        transactionWitnessSet.set_redeemers(redeemers);

        // Get the current blockchain slot time
        const currentTime = await fetchCurrentSlot()

        // set_validity_start_interval is the current slot on the cardano blockchain
        txBuilder.set_validity_start_interval(currentTime.slot);

        // ttl is an absolute slot number greater than the current slot. This code sets the ttl to "timeToLive" seconds after the current slot
        // Transactions will silently fail and not place a bid if this time window is not before the end of the auction
        txBuilder.set_ttl(currentTime.slot + timeToLive); 
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

    /*
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
    */
    // Calculate Script Data Hash
    console.log(txBuilder);

    /*
    txBuilder.calc_script_data_hash(
        Loader.Cardano.Instance.TxBuilderConstants.plutus_vasil_cost_models()
      );
      */

    // Build the full transaction
    //const fee = Loader.Cardano.BigNum.from_str("300000")
    //txBuilder.set_fee(fee)
    
    txBuilder.add_change_if_needed(changeAddress.to_address());
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
    const output = Loader.Cardano.TransactionOutput.new(address, value);
    if (datum) {
        output.set_data_hash(Loader.Cardano.hash_plutus_data(datum));
        metadata[DATUM_LABEL][index] = bytesToArray("0x" + toHex(datum.to_bytes()));
    }
    const minAda = Loader.Cardano.min_ada_for_output(
        output,
        Loader.Cardano.DataCost.new_coins_per_byte(Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.coinsPerUtxoByte))
      );

    if (minAda.compare(value.coin()) == 1) value.set_coin(minAda);

    const newOutput = Loader.Cardano.TransactionOutput.new(address, value);
    if (datum) {
        newOutput.set_data_hash(Loader.Cardano.hash_plutus_data(datum));
    }    
    
    if (sellerAddress) {
        metadata[SELLER_ADDRESS_LABEL].address = "0x" + toHex(sellerAddress.to_address().to_bytes());
    }
    if (bidderAddress) {
        metadata[BIDDER_ADDRESS_LABEL].address = "0x" + toHex(bidderAddress.to_address().to_bytes());
    }
    
    return newOutput;
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
    return amount.checked_mul(Loader.Cardano.BigNum.from_str("10").div_floor(Loader.Cardano.BigNum.from_str(scaledFee)));
};

export const setCollateral = (txBuilder: any, walletAddres: any, utxos: any) => {
    const inputBuilder = Loader.Cardano.TxInputsBuilder.new();
    utxos.forEach((utxo: any) => {
        inputBuilder.add_input(Loader.Cardano.Address.from_bech32(walletAddres), utxo.input(), utxo.output().amount());
    });
    txBuilder.set_collateral(inputBuilder);
}