import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools  } from 'react-query/devtools';

import { Layout } from '../src/components/Layouts/Layout';
import Loader from '../src/cardano/loader';

import '../public/styles/bootstrap/bootstrap.min.css'
import { useEffect } from 'react';


const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) =>
{
    useEffect(() => {
        const loadCardanoSerializationLib = async () => await load();
        loadCardanoSerializationLib();
    }, [load]);
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
    if (!Loader.Cardano) {
        await Loader.load();
    }    
}
