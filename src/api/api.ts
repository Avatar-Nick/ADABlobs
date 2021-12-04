class API {
    baseURL: string;
    endpoints: any;

    constructor({ baseURL, endpoints } : any) {
        this.baseURL = baseURL;
        this.endpoints = endpoints;
    }
}

export const blockfrostAPI = new API(
    {
        baseURL: process.env.BLOCKFROST_API_URL,
        endpoints: {
            address: (address: string) => `/addresses/${address}`,
        }
    }
)
    