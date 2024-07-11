import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';
import logo from '../../Assets/NFT Lord.png';
import searchIcon from '../../Assets/search-w.png';
import signupIcon from '../../Assets/signUpIcon.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const signupButtonRef = useRef(null);
  const ulElementRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      ulElementRef.current.appendChild(searchContainerRef.current);
      ulElementRef.current.appendChild(signupButtonRef.current);
    } else {
      const navElement = ulElementRef.current.parentNode;
      navElement.appendChild(searchContainerRef.current);
      navElement.appendChild(signupButtonRef.current);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <motion.img 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      src={logo} alt="Logo" 
      className='logo-img' />
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
        ref={searchContainerRef} className="search-container">
        <input type="text" placeholder="Search..." />
        <button><img src={searchIcon} alt="Search" /></button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        ref={signupButtonRef} className="signup-button">
        <button className='sign-btn'><img src={signupIcon} alt="" /></button>
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