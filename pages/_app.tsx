
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools  } from 'react-query/devtools';

import { Layout } from '../src/components/Layouts/Layout';
import Loader from '../src/cardano/loader';
import TransactionParamers from '../src/cardano/cardanoBlockchain';
import CardanoBlockchain from '../src/cardano/cardanoBlockchain';

import '../public/styles/base.css';
import '../public/styles/bootstrap/bootstrap.min.css'


const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) =>
{
    useEffect(() => {
        const loadCardanoLibraries = async () => await load();
        loadCardanoLibraries();
    });
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}

export default App;

const load = async () => {

    const loadList = []
    if (!Loader.Cardano) {
        loadList.push(Loader.load());
    }
    
    if (!CardanoBlockchain.protocolParameters) {
        loadList.push(CardanoBlockchain.load());
    }

    // Load all Cardano data in Parallel
    await Promise.all(loadList);
}
