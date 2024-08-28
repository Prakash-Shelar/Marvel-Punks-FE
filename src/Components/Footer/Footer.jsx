import React from 'react'
import './Footer.css'
import { motion } from 'framer-motion';
import logo from '../../Assets/NFT Lord.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
      <motion.div
        className='container-footer'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
        <div className='foot1'>
            <h1>Marvel Punks</h1>
            <div className='container-social'>
              <button className='btn-social'><FontAwesomeIcon icon={faFacebookF} style={{color: 'white', fontSize: '20px'}}/></button>
              <button className='btn-social'><FontAwesomeIcon icon={faLinkedinIn} style={{color: 'white', fontSize: '20px'}}/></button>
              <button className='btn-social'><FontAwesomeIcon icon={faInstagram} style={{color: 'white', fontSize: '20px'}}/></button>
              <button className='btn-social'><FontAwesomeIcon icon={faTwitter} style={{color: 'white', fontSize: '20px'}}/></button>
            </div>
            <p>copyright @2024 <b>NFT</b>. All right reserved</p>
        </div>
        <div className='foot2'>
          <h1 className='foot-h1'>Marketplace</h1>
          <div className='container-para'>
            <p className='foot-p'>Explore</p>
            <p className='foot-p'>NFTs</p>
            <p className='foot-p'>Collectibles</p>
            <p className='foot-p'>Virtuallyreally</p>
          </div>
        </div>
        <div className='foot3'>
          <h1 className='foot-h1'>Company</h1>
          <div className='container-para'>
            <p className='foot-p'>About Us</p>
            <p className='foot-p'>Support</p>
            <p className='foot-p'>Carrers</p>
            <p className='foot-p'>Newsletter</p>
          </div>
        </div>
        <div className='foot4'>
        <h1 className='foot-h1'>Resources</h1>
          <div className='container-para'>
            <p className='foot-p'>Partners</p>
            <p className='foot-p'>Blogs</p>
            <p className='foot-p'>Help Center</p>
            <p className='foot-p'>Live Action</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Footer
