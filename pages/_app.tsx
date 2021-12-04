import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools  } from 'react-query/devtools';

import { Layout } from '../src/components/Layouts/Layout';

import '../public/styles/bootstrap/bootstrap.min.css'


const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) =>
{
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