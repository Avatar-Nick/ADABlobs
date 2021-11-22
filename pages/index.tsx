import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Index() {
  return (
    <div className="title-container test">
      <Head>
        <title>ADA Blobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Read{' '}
            <Link href="/posts/first-post">
              <a>this page!</a>
            </Link>
        </h1>
        <Image src="/images/Bob.png" height={256} width={256} alt="Bob"/>
       
      </main>

      <footer>
        
      </footer>

      <style jsx>{`
        .title-container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: green;
        }
      `}</style>

      
    </div>
  )
}

/*
<style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
*/
