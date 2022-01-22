import { idToString } from "./idToLongString";

export const convertIPFSToHTTP = (url: string) => {
    let hash = url.replace("ipfs://", "");
    const newURL = `https://ipfs.blockfrost.dev/ipfs/${hash}`
    return newURL;
}

export const getBlobLocalImage = (id: number, name: string) => {
    const imageLocation = `/images/blobs/${idToString(id)}-${name}.png`
    return imageLocation;
}