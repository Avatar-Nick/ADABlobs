import Loader from '../loader';
import { blockfrostAPI } from '../../api/api';
import { fetchProtocolParameters } from '../../api/requests';

const DATUM_LABEL = 405;
const ADDRESS_LABEL = 406;
const languageViews =
  "a141005901d59f1a000302590001011a00060bc719026d00011a000249f01903e800011a000249f018201a0025cea81971f70419744d186419744d186419744d186419744d186419744d186419744d18641864186419744d18641a000249f018201a000249f018201a000249f018201a000249f01903e800011a000249f018201a000249f01903e800081a000242201a00067e2318760001011a000249f01903e800081a000249f01a0001b79818f7011a000249f0192710011a0002155e19052e011903e81a000249f01903e8011a000249f018201a000249f018201a000249f0182001011a000249f0011a000249f0041a000194af18f8011a000194af18f8011a0002377c190556011a0002bdea1901f1011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000242201a00067e23187600010119f04c192bd200011a000249f018201a000242201a00067e2318760001011a000242201a00067e2318760001011a0025cea81971f704001a000141bb041a000249f019138800011a000249f018201a000302590001011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a00330da70101ff";


export const loadTransactionParameters = async () => {
    const blockfrostProtocolParameters = await fetchProtocolParameters();
    
    // Spacebudz code referencing blockfrost protocolParameter Issues
    /*
     this.protocolParameters = {
       linearFee: {
         minFeeA: p.min_fee_a.toString(),
         minFeeB: p.min_fee_b.toString(),
       },
       minUtxo: "1000000",
       poolDeposit: p.pool_deposit,
       keyDeposit: p.key_deposit,
       maxValSize: parseInt(p.max_val_size),
       maxTxSize: parseInt(p.max_tx_size),
       priceMem: parseFloat(p.price_mem),
       priceStep: parseFloat(p.price_step),
     };
    TODO: wait for blockfrost fix
    */
    const protocolParameters = {
        linearFee: {
          minFeeA: blockfrostProtocolParameters.min_fee_a.toString(),
          minFeeB: blockfrostProtocolParameters.min_fee_b.toString(),
        },
        minUtxo: "1000000",
        poolDeposit: "500000000",
        keyDeposit: "2000000",
        maxValSize: "5000",
        maxTxSize: 16384,
        priceMem: 5.77e-2,
        priceStep: 7.21e-5,
      };
    return protocolParameters;
}

export const initializeTransaction = async () => {
    const protocolParameters = await loadTransactionParameters();
    const txBuilder = Loader.Cardano.TransactionBuilder.new(
        Loader.Cardano.LinearFee.new(
            Loader.Cardano.BigNum.from_str(
                protocolParameters.linearFee.minFeeA
            ),
            Loader.Cardano.BigNum.from_str(
                protocolParameters.linearFee.minFeeB
            )
        ),
        Loader.Cardano.BigNum.from_str(protocolParameters.minUtxo),
        Loader.Cardano.BigNum.from_str(protocolParameters.poolDeposit),
        Loader.Cardano.BigNum.from_str(protocolParameters.keyDeposit),
        protocolParameters.maxValSize,
        protocolParameters.maxTxSize,
        protocolParameters.priceMem,
        protocolParameters.priceStep,
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