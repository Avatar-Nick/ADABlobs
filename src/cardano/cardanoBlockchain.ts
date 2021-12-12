
import { fetchProtocolParameters } from '../api/requests';

class CardanoBlockchain {
    protocolParameters: any;

    load = async () => {
        this.protocolParameters = await this.loadProtocolParameters();
    }

    loadProtocolParameters = async () => {
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

        this.protocolParameters = protocolParameters;
    }
}

export default new CardanoBlockchain();