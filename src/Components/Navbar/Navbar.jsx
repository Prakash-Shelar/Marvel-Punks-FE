import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';
import signupIcon from '../../Assets/signUpIcon.png';
import { WalletContext } from '../WalletContext'; // Import WalletContext

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const signupButtonRef = useRef(null);
  const ulElementRef = useRef(null);

  const { address, web3Provider, connectWallet } = useContext(WalletContext); // Access wallet context

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
