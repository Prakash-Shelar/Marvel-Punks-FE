import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Clients from './Components/Clients/Clients';
import Art from './Components/Art/Art';
import Gallery from './Components/Gallery/Gallery';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Clients />
      <Art />
      <Gallery />
      <Footer />
    </div>
  );
};

export default App;
