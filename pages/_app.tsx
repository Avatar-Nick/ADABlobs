import { AppProps } from 'next/app'
import { Layout } from '../src/Layouts/Layout'

import '../public/styles/bootstrap/bootstrap.min.css'

export default function App({ Component, pageProps }: AppProps) 
{
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}