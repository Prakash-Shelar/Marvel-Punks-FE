import { AlephiumWalletProvider } from '@alephium/web3-react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Art from './Components/Art/Art';
import Clients from './Components/Clients/Clients';
import Footer from './Components/Footer/Footer';
import Gallery from './Components/Gallery/Gallery';
import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <AlephiumWalletProvider theme="simple-dark">
      {/* AlephiumConnectProvider is now wrapping the whole app */}

      {/* Wrap your components with WalletProvider */}
      <Navbar />
      <div>
        <Hero />
        <ToastContainer />
      </div>
      <Clients />
      <Art />
      <Gallery />
      <Footer />
    </AlephiumWalletProvider>
  );
};

export default App;
