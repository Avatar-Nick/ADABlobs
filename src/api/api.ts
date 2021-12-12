class API {
    baseURL: string;
    endpoints: any;

    // We require client URLS to protect API keys
    clientURL: string;
    clientEndpoints: any;

    constructor({ baseURL, endpoints, clientURL, clientEndpoints } : any) {
        this.baseURL = baseURL;
        this.endpoints = endpoints;
        this.clientURL = clientURL;
        this.clientEndpoints = clientEndpoints;
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
            address: {
                base: (address: string) => `/addresses/${address}`,
                utxos: (address: string, asset: string) => `/addresses/${address}/utxos/${asset}`,
            },
            epochs: {
                latest: {
                    parameters: () => `/epochs/latest/parameters`
                }
            },
            txs: {
                metadata: (tx_hash: string) => `/txs/${tx_hash}/metadata`
            }
        },
        clientURL: process.env.NEXT_PUBLIC_BLOCKFROST_CLIENT_API_URL,
        clientEndpoints: {
            address: {
                base: (address: string) => `/addresses/${address}`,
                utxos: (address: string, asset: string) => `/addresses/${address}/utxos/${asset}`,
            },
            epochs: {
                latest: {
                    parameters: () => `/epochs/latest/parameters`
                }
            },
            txs: {
                metadata: (tx_hash: string) => `/txs/${tx_hash}/metadata`
            }
        }    
    }
)
    