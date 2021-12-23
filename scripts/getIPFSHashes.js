require('dotenv').config();

// Using pinata to get ipfs data hashes
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
console.log(process.env.PINATA_API_KEY);
console.log(process.env.PINATA_SECRET_KEY);

pinata.testAuthentication().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

pinata.pinList().then((result) => {
    console.log(result);
    console.log(result["rows"][0]["metadata"])

}).catch((err) => {
    console.log(err);
});
