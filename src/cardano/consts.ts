export const fee = "10"; // 1.0%
export const adaToLovelace = 1000000;
export const lovelaceToAda = .000001;
export const blobPolicyId = () =>{
    let blobPolicyId = '4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318';
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') 
    {
        // This is the SundaeSwap Mint test token
        blobPolicyId = "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522";
    }
    return blobPolicyId;
};