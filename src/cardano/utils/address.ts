import Loader from "../../cardano/loader";

export const addressToBech32 = async () => 
{
    await Loader.load();
    const address = (await window.cardano.getUsedAddresses())[0];
    return Loader.Cardano.Address.from_bytes(
        Buffer.from(address, "hex")
    ).to_bech32();
};