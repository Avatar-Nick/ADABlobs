import Loader from '../loader';
import WalletAPI from './wallet';
import CardanoBlockchain from '../cardanoBlockchain';
import { fromHex, toHex } from '../serialization';
import { fee } from '../consts';
import { CONTRACT, MARKETPLACE_ADDRESS } from '../plutus/contract';
import { bytesToArray } from '../plutus/utils';
import { fetchCurrentSlot } from '../../api/requests';
import { mintassets_get } from '../custom_modules/@dcspark/cardano-multiplatform-lib-browser/cardano_multiplatform_lib_bg.wasm';

export const DATUM_LABEL = 405;
export const SELLER_ADDRESS_LABEL = 406;
export const BIDDER_ADDRESS_LABEL = 407;

export const initializeTransaction = async () => 
{
  console.log(CardanoBlockchain.protocolParameters);
  console.log(1);
    const costmdls = Loader.Cardano.Costmdls.new();
    const costmdl = Loader.Cardano.CostModel.new();
    Object.values(CardanoBlockchain.protocolParameters.costModels.PlutusV1).forEach(
        (cost, index) => {
          costmdl.set(index, Loader.Cardano.Int.new_i32(cost));
        }
      );
    costmdls.insert(Loader.Cardano.Language.new_plutus_v1(), costmdl);

    console.log(2);
    const blockfrost: any = {url: process.env.NEXT_PUBLIC_BLOCKFROST_API_URL + "/utils/txs/evaluate", blockfrost: process.env.NEXT_PUBLIC_BLOCKFROST} 
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
      .ex_unit_prices(Loader.Cardano.ExUnitPrices.from_float(
        CardanoBlockchain.protocolParameters.priceMem,
        CardanoBlockchain.protocolParameters.priceStep
      ))
      .collateral_percentage(CardanoBlockchain.protocolParameters.collateralPercent)
      .max_collateral_inputs(CardanoBlockchain.protocolParameters.maxCollateralInputs)
      .costmdls(costmdls)
      .blockfrost(
        Loader.Cardano.Blockfrost.new(
            blockfrost.url,
            blockfrost.blockfrost
        )
      )
      .build());
      console.log(3);

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
    timeToLive = 2 * 60 * 60,
  }: any) => {

    console.log(7);
    // Build the transaction outputs
    for (let i = 0; i < outputs.len(); i++) 
    {
      txBuilder.add_output(outputs.get(i));
    } 

    console.log(8);

    // Ensure proper redeemers for transaction
    if (scriptUtxo) {
        txBuilder.add_input(
            scriptUtxo,
            Loader.Cardano.ScriptWitness.new_plutus_witness(
              Loader.Cardano.PlutusWitness.new(action("0").data())
            )
          );

          console.log(9);

        txBuilder.add_plutus_script(CONTRACT().get(0));
        for (let i = 0; i < datums.len(); i++) {
            txBuilder.add_plutus_data(datums.get(i));
        }

        const collateral = await WalletAPI.getCollateral();
        if (!collateral || collateral.length <= 0) throw new Error("Your wallet has no collateral. Ensure your connected wallet has collateral. You can follow the guide page for instructions");
        
        collateral.slice(0, 2).forEach((coll: any) => {
            txBuilder.add_collateral(coll);
        });

        // Get the current blockchain slot time
        const currentTime = await fetchCurrentSlot()

        // set_validity_start_interval is the current slot on the cardano blockchain
        txBuilder.set_validity_start_interval(Loader.Cardano.BigNum.from_str(currentTime.slot.toString()));

        // ttl is an absolute slot number greater than the current slot. This code sets the ttl to "timeToLive" seconds after the current slot
        // Transactions will silently fail and not place a bid if this time window is not before the end of the auction
        const ttl = currentTime.slot + timeToLive;
        txBuilder.set_ttl(Loader.Cardano.BigNum.from_str(ttl.toString())); 
    }

    console.log(10);

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

    console.log(11);

    const u = Loader.Cardano.TransactionUnspentOutputs.new();
    utxos.forEach((utxo: any) => {
      u.add(utxo);
    });

    txBuilder.add_inputs_from(u, changeAddress.to_address());
    txBuilder.balance(changeAddress.to_address());
    const tx = await txBuilder.construct(u, changeAddress.to_address());

    console.log(12);

    const witnessSetBuilder = Loader.Cardano.TransactionWitnessSetBuilder.new();
    witnessSetBuilder.add_existing(tx.witness_set());

    let txVKeyWitnesses = await WalletAPI.signTx(tx);
    txVKeyWitnesses = Loader.Cardano.TransactionWitnessSet.from_bytes(
      fromHex(txVKeyWitnesses)
    );
    witnessSetBuilder.add_existing(txVKeyWitnesses);

    // Sign the transaction
    const signedTx = Loader.Cardano.Transaction.new(
        tx.body(),
        witnessSetBuilder.build(),
        tx.auxiliary_data()
    ); 

    // Ensure the transaction size is below the max transaction size for the Cardano Blockchain
    const size = signedTx.to_bytes().length;
    if (size > CardanoBlockchain.protocolParameters.maxTxSize)
        throw new Error(`The maximum transaction size has been reached: ${CardanoBlockchain.protocolParameters.maxTxSize} bytes. Please contact us in our discord channel for help`);
   
    
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
        output.set_datum(Loader.Cardano.Datum.new_data_hash(Loader.Cardano.hash_plutus_data(datum)));
        metadata[DATUM_LABEL][index] = bytesToArray("0x" + toHex(datum.to_bytes()));
    }

    let minAda = Loader.Cardano.min_ada_required(
        output,
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.coinsPerUtxoByte)
      );

    const one = Loader.Cardano.BigNum.from_str("1000000");
    if (one.compare(minAda) == 1) minAda = one;
    if (minAda.compare(value.coin()) == 1) value.set_coin(minAda);

    const newOutput = Loader.Cardano.TransactionOutput.new(address, value);
    if (datum) {
        newOutput.set_datum(Loader.Cardano.Datum.new_data_hash(Loader.Cardano.hash_plutus_data(datum)));
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
    return amount.checked_mul(Loader.Cardano.BigNum.from_str("10").checked_div(Loader.Cardano.BigNum.from_str(scaledFee)));
};
