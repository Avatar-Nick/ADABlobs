import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools  } from 'react-query/devtools'
import { AppProps } from 'next/app'
import { Layout } from '../src/Layouts/Layout'

import '../public/styles/bootstrap/bootstrap.min.css'


const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) 
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