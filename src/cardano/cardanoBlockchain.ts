
import { fetchProtocolParameters } from '../api/requests';

class CardanoBlockchain {
    protocolParameters: any;

    load = async () => {
        this.protocolParameters = await this.loadProtocolParameters();
    }

    loadProtocolParameters = async () => {
        const blockfrostProtocolParameters = await fetchProtocolParameters();
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
          };

        return protocolParameters;
    }
}

export default new CardanoBlockchain();