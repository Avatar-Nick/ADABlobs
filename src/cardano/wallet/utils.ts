import Loader from '../loader';

export const getBaseAddressFromAddressString = async (addressBech32: string) => {
    const addressObject = Loader.Cardano.Address.from_bech32(addressBech32);
    const baseAddress = Loader.Cardano.BaseAddress.from_address(addressObject);
    return baseAddress;
}