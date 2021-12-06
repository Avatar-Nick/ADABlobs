class API {
    baseURL: string;
    endpoints: any;

    constructor({ baseURL, endpoints } : any) {
        this.baseURL = baseURL;
        this.endpoints = endpoints;
    }
}

//export const adablobsAPI = new API()
// TODO add this to the adablobs api
export const fetchAssets = async ({ pageParam = 1 } : any) => {
    const response = await fetch(`http://localhost:3000/api/adablobs/blobs?page=${pageParam}`)
    return response.json();
}

export const blockfrostAPI = new API(
    {
        baseURL: process.env.BLOCKFROST_API_URL,
        endpoints: {
            address: (address: string) => `/addresses/${address}`,
        }
    }
)


    