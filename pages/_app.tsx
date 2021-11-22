import { AppProps } from 'next/app'
import '../public/styles/bootstrap/bootstrap.min.css'

export default function App({ Component, pageProps }: AppProps) 
{
    return <Component {...pageProps} />
}