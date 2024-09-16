import React from "react";
import Art from "./Components/Art/Art";
import Clients from "./Components/Clients/Clients";
import Footer from "./Components/Footer/Footer";
import Gallery from "./Components/Gallery/Gallery";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import { WalletProvider } from "./Components/WalletContext"; // Import WalletProvider

const App = () => {
  return (
    <WalletProvider>
      {" "}
      {/* Wrap your components with WalletProvider */}
      <Navbar />
      <Hero />
      <Clients />
      <Art />
      <Gallery />
      <Footer />
    </WalletProvider>
  );
};

export default App;
