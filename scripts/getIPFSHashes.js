require('dotenv').config();

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
console.log(process.env.PINATA_API_KEY);
console.log(process.env.PINATA_SECRET_KEY);

pinata.testAuthentication().then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});

pinata.pinList().then((result) => {
    //handle results here
    console.log(result);
    console.log(result["rows"][0]["metadata"])

}).catch((err) => {
    //handle error here
    console.log(err);
});
