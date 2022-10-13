
import { fetchProtocolParameters } from '../api/requests';

class CardanoBlockchain {
    protocolParameters: any;

    load = async () => {
        this.protocolParameters = await this.loadProtocolParameters();
    }

    loadProtocolParameters = async () => {
        const blockfrostProtocolParameters = await fetchProtocolParameters();

        /*
        const protocolParameters = {
            linearFee: {
              minFeeA: blockfrostProtocolParameters.min_fee_a.toString(),
              minFeeB: blockfrostProtocolParameters.min_fee_b.toString(),
            },
            minUtxo: "1000000",
            poolDeposit: "500000000",
            keyDeposit: "2000000",
            coinsPerUtxoWord: "34482", // deprecated
            coinsPerUtxoByte: "4310",
            maxValSize: "5000",
            maxTxSize: 16384,
            priceMemNumerator: "577",
            priceMemDenominator: "10000",
            priceMem: 5.77e-2,
            priceStepNumerator: "721",
            priceStepDenominator: "10000000",
            priceStep: 7.21e-5,
            collateralPercent: "150",
            maxCollateralInputs: "3",
            costModels
          };
          */
        
          const protocolParameters = {
            linearFee: {
              minFeeA: blockfrostProtocolParameters.min_fee_a.toString(),
              minFeeB: blockfrostProtocolParameters.min_fee_b.toString(),
            },
            coinsPerUtxoByte: blockfrostProtocolParameters.coins_per_utxo_size.toString(),
            poolDeposit: blockfrostProtocolParameters.pool_deposit,
            keyDeposit: blockfrostProtocolParameters.key_deposit,
            maxValSize: parseInt(blockfrostProtocolParameters.max_val_size),
            maxTxSize: parseInt(blockfrostProtocolParameters.max_tx_size),
            priceMem: parseFloat(blockfrostProtocolParameters.price_mem),
            priceStep: parseFloat(blockfrostProtocolParameters.price_step),
            maxCollateralInputs: parseInt(blockfrostProtocolParameters.max_collateral_inputs),
            collateralPercentage: 0, // parseInt(p.collateral_percent),
            costModels: blockfrostProtocolParameters.cost_models,
          };


        return protocolParameters;
    }
}

export default new CardanoBlockchain();