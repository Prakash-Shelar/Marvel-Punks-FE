import React, { createContext, useState } from 'react';
import Web3Modal from 'web3modal';
import { BrowserProvider } from 'ethers';

// Create a context for the wallet
export const WalletContext = createContext({
  address: null,
  web3Provider: null,
  connectWallet: () => {},
});

const providerOptions = {
    // Add other wallet providers here if needed
  };

export const WalletProvider = ({ children }) => {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });

      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new BrowserProvider(web3ModalInstance); // Ensure correct provider instantiation
      const signer = await web3ModalProvider.getSigner();
      const userAddress = await signer.getAddress();

      setWeb3Provider(web3ModalProvider);
      setAddress(userAddress);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <WalletContext.Provider value={{ address, web3Provider, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
