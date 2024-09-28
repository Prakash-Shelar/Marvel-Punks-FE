import React, { createContext, useState } from "react";

// Create a context for the wallet
export const WalletContext = createContext({
  address: null,
  alephium: null,
  connectAlephium: () => {}, // For Alephium connection
  selectedWallet: null,
});

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [alephium, setAlephium] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Function to connect Alephium Wallet
  async function connectAlephium() {
    try {
      // Check if Alephium Wallet is available
      if (window.alph) {
        const accounts = await window.alph.getAccounts();
        const alephiumAddress = accounts[0]?.address;

        if (alephiumAddress) {
          setAlephium(window.alph);
          setAddress(alephiumAddress);
          setSelectedWallet("Alephium"); // Store wallet type
        } else {
          throw new Error("Alephium Wallet not connected");
        }
      } else {
        throw new Error("Alephium Wallet not installed");
      }
    } catch (error) {
      console.log(error);
      // If Alephium Wallet is not installed, notify the user
      if (error.message === "Alephium Wallet not installed") {
        alert(
          "Alephium Wallet is not installed. Please install it from https://chrome.google.com/webstore/detail/alephium-wallet/"
        );
      } else {
        console.error(error);
      }
    }
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        alephium,
        connectAlephium,
        selectedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
