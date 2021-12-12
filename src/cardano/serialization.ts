import { Buffer } from "buffer";
import Loader from './loader';

// Thank you SpaceBudz for these helper functions
export const fromHex = (hex: any) => Buffer.from(hex, "hex");
export const toHex = (bytes: any) => Buffer.from(bytes).toString("hex");
export const toBytesNum = (num: any) =>
  num
    .toString()
    .split("")
    .map((d: any) => "3" + d)
    .join("");
export const fromAscii = (hex: any) => Buffer.from(hex).toString("hex");

export const assetsToValue = (assets: any) => {
    const multiAsset = Loader.Cardano.MultiAsset.new();
    const lovelace = assets.find((asset: any) => asset.unit == "lovelace")

    // Get the policy ids off all assets
    const policies = [
        ...new Set(assets.filter((asset: any) => asset.unit !== "lovelace").map((asset: any) => asset.unit.slice(0, 56))),
      ];

    // Loop through all policies and get their quantity
    policies.forEach((policy: any) => {
        const policyAssets = assets.filter((asset: any) => asset.unit.slice(0, 56) === policy);
        const assetsValue = Loader.Cardano.Assets.new();
        policyAssets.forEach((asset: any) => {
            assetsValue.insert(
                Loader.Cardano.AssetName.new(Buffer.from(asset.unit.slice(56), "hex")),
                Loader.Cardano.BigNum.from_str(asset.quantity)
            );
        });
        multiAsset.insert(
            Loader.Cardano.ScriptHash.from_bytes(Buffer.from(policy, "hex")),
            assetsValue
        )
    });
    const value = Loader.Cardano.Value.new(Loader.Cardano.BigNum.from_str(lovelace ? lovelace.quantity : "0"));
    if (assets.length > 1 || !lovelace) value.set_multiasset(multiAsset);
    return value;
}