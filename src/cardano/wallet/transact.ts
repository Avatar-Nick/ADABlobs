import Loader from '../loader';
import CardanoBlockchain from '../cardanoBlockchain';
import { toHex } from '../serialization';

const DATUM_LABEL = 405;
const ADDRESS_LABEL = 406;
const languageViews =
  "a141005901d59f1a000302590001011a00060bc719026d00011a000249f01903e800011a000249f018201a0025cea81971f70419744d186419744d186419744d186419744d186419744d186419744d18641864186419744d18641a000249f018201a000249f018201a000249f018201a000249f01903e800011a000249f018201a000249f01903e800081a000242201a00067e2318760001011a000249f01903e800081a000249f01a0001b79818f7011a000249f0192710011a0002155e19052e011903e81a000249f01903e8011a000249f018201a000249f018201a000249f0182001011a000249f0011a000249f0041a000194af18f8011a000194af18f8011a0002377c190556011a0002bdea1901f1011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000242201a00067e23187600010119f04c192bd200011a000249f018201a000242201a00067e2318760001011a000242201a00067e2318760001011a0025cea81971f704001a000141bb041a000249f019138800011a000249f018201a000302590001011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a00330da70101ff";

export const initializeTransaction = async () => {
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
    const metadata = { [DATUM_LABEL]: {}, [ADDRESS_LABEL]: {} };
    const outputs = Loader.Cardano.TransactionOutputs.new();
    return { txBuilder, datums, metadata, outputs };
}

export const finalizeTransaction = async () => {
    const transactionWitnessSet = Loader.Cardano.TransactionWitnessSet.new();
    /*
    let { input, change } = CoinSelection.randomImprove(
        utxos,
        outputs,
        8,
        scriptUtxo ? [scriptUtxo] : []
      );
      input.forEach((utxo) => {
        txBuilder.add_input(
          utxo.output().address(),
          utxo.input(),
          utxo.output().amount()
        );
      });

    */
}

// Spacebudz createOutput function which will build the output of the transaction
export const createOutput = async (address : any, value: any, { datum, index, tradeOwnerAddress, metadata }: any = {}) => {
    const minAda = Loader.Cardano.min_ada_required(
        value,
        Loader.Cardano.BigNum.from_str(CardanoBlockchain.protocolParameters.minUtxo),
        datum && Loader.Cardano.hash_plutus_data(datum)
      );
    if (minAda.compare(value.coin()) == 1) value.set_coin(minAda);

    const output = Loader.Cardano.TransactionOutput.new(address, value);
    if (datum) {
        output.set_data_hash(Loader.Cardano.hash_plutus_data(datum));
        metadata[DATUM_LABEL][index] = "0x" + toHex(datum.to_bytes());
    }
    if (tradeOwnerAddress) {
        metadata[ADDRESS_LABEL].address = "0x" + toHex(tradeOwnerAddress.to_address().to_bytes());
    }
    
    return output;
}