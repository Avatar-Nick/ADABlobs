<h1 align="center">
  <a href="https://adablobs.io">
    <img alt="ADABlobs" src="./public/images/Logo.png" width="100" />
    <img alt="ADABlobs" src="./public/images/LogoText.png" width="480" />
  </a>
</h1>
  
Welcome to [ADABlobs](https://adablobs.io/)! The cutest and most adorable NFT collection on Cardano. There are 300 Blob NFTs to collect with 1 new Blob being available each week until all 300 are released. ADA Blobs is the first auction marketplace on the Cardano Blockchain by leveraging Cardano's Plutus Smart Contract capability. This repository contains the full front implementation of the ADA Blobs website. The repository for the full Plutus Smart Contracts can be found here

<div align="center">
  <img alt="ADABlobs" src="./public/images/blobs/001 - Bob.png" width="256" />
  <img alt="ADABlobs" src="./public/images/blobs/007 - Yolg - Reverse.png" width="256" />
</div>

### Validity

To make sure you have a real ADA Blob the Policy ID of your Blob must be:
**`4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318`**

You can find the associated policy script in `./public/data/minting_policy.json`

The contract address for the official ADA Blobs auction market place is:
**`addr1w8qupuhmh3qwckr7dglaqkjr7qhruglem6anp49x9ey70wcrn3fa8`**

<div align="center">
  <img alt="ADABlobs" src="./public/images/blobs/008 - Glob.png" width="256" />
  <img alt="ADABlobs" src="./public/images/blobs/005 - Rooboo - Reverse.png" width="256" />
</div>

### Metadata

ADA Blobs follows [CIP-25](https://github.com/cardano-foundation/CIPs/blob/master/CIP-0025/CIP-0025.md), the NFT metadata standard on Cardano. On-chain metadata for each blob is structured as the following:

```
{
  "721": {
    "4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318": {
      "ADABlob1": {
        "color": "Blue",
        "hex": "2CBBE7",
        "id": 1,
        "image": "ipfs://QmXWRYfj5WPF942GWnJYbzPwX2LaAFBN1Wg2PkRGSCVoXV",
        "name": "Bob",
        "project": "ADA Blobs"
      }
    }
  }
}
```

Images are stored on IPFS and you find the image link to an ADA Blob inside the metadata.


