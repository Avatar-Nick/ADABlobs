/*
export const convertIPFSToHTTP = (url: string) => {
    let hash = url.replace("ipfs://", "");
    const newURL = `https://ipfs.io/ipfs/${hash}`
    return newURL;
}
*/

export const convertIPFSToHTTP = (url: string) => {
    let hash = url.replace("ipfs://", "");
    const newURL = `https://ipfs.blockfrost.dev/ipfs/${hash}`
    return newURL;
}