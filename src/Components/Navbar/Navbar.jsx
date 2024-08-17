import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';
import signupIcon from '../../Assets/signUpIcon.png';
import Web3Modal from 'web3modal';
import { BrowserProvider } from 'ethers'; // Updated for ethers v6+


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const signupButtonRef = useRef(null);
  const ulElementRef = useRef(null);

  useEffect(() => {
    const navElement = ulElementRef.current.parentNode;
    if (isMenuOpen) {
      ulElementRef.current.appendChild(searchContainerRef.current);
      ulElementRef.current.appendChild(signupButtonRef.current);
    } else {
      navElement.appendChild(searchContainerRef.current);
      navElement.appendChild(signupButtonRef.current);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const providerOptions = {
    // Add other wallet providers here if needed
  };
  
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions // required
      });

      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new BrowserProvider(web3ModalInstance); // Updated provider instantiation
      const signer = await web3ModalProvider.getSigner();
      const userAddress = await signer.getAddress();

      setWeb3Provider(web3ModalProvider);
      setAddress(userAddress);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav>
      <div className='logo'>
        <h1>MARVEL PUNKS</h1>
      </div>
      <motion.ul 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={ulElementRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>Marketplace</li>
        <li>Explore</li>
        <li>Artists</li>
        <li>Collections</li>
      </motion.ul>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={searchContainerRef} className="connect-btn">
        <button className='con-btn' onClick={connectWallet}>
          {web3Provider == null 
          ? 'Connect Wallet' 
          : `Connected: ${address.slice(0,6)}...${address.slice(-4)}`}
        </button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={signupButtonRef} className="signup-button">
        <button className='sign-btn'><img src={signupIcon} alt="Sign Up" /></button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='hamburger-icon' onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
