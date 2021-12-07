class API {
    baseURL: string;
    endpoints: any;

    constructor({ baseURL, endpoints } : any) {
        this.baseURL = baseURL;
        this.endpoints = endpoints;
    }    
}

export const adablobsAPI = new API (
    {
        baseURL: process.env.NEXT_PUBLIC_ADABLOBS_API_URL,
        endpoints: {
            blobs: {
                base: (page: number) => `/blobs?page=${page}`,
                blob: (asset: string) => `/blobs/${asset}`,
                script: () => `/blobs/scripts`
            },
            address: (address: string) => `/addresses/${address}`,
        }
    }
)

export const blockfrostAPI = new API(
    {
        baseURL: process.env.BLOCKFROST_API_URL,
        endpoints: {
            address: (address: string) => `/addresses/${address}`,
        }
    }
)


    