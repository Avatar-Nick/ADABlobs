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
    const policies = [
        ...new Set(assets.filter((asset: any) => asset.unit !== "lovelace").map((asset: any) => asset.unit.slice(0, 56))),
      ];
}