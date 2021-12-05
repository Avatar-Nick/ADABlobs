export const convertIPFSToHTTP = (url) => {
    let hash = url.replace("ipfs://", "");
    const newURL = `https://ipfs.io/ipfs/${hash}`
    return newURL;
}