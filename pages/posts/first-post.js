import Link from 'next/link'

export default function FirstPost() 
{
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <button onClick={test}>Hello World</button>
    </>
  )
}

const test = () => {
    console.log("Hello World")
    console.log(window);
    console.log(window.cardano);
    
    window.cardano.enable();
}