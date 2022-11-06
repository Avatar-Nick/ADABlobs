import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MercuryChat } from '@mercury-chat/react-chat';

export const Layout = ({ children } : { children: React.ReactNode }) => 
{
  return (
    <>
      <Navbar />
      <MercuryChat position={'bottom-right'} showBackground={false} />
      <main>{children}</main>
      <Footer />
    </>
  )
}