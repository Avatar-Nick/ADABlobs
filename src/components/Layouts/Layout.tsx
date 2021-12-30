import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children } : { children: React.ReactNode }) => 
{
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}