
import { fetchProtocolParameters } from '../api/requests';

class CardanoBlockchain {
    protocolParameters: any;

    load = async () => {
        this.protocolParameters = await this.loadProtocolParameters();
    }

    loadProtocolParameters = async () => {
        const blockfrostProtocolParameters = await fetchProtocolParameters();\
        
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