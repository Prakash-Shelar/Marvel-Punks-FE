import React from 'react'
import './Hero.css'
import { motion } from 'framer-motion';
import play from '../../Assets/play.png';
import arrow from '../../Assets/Arrow design.png';
import Marvel from '../../Assets/marvel.png';
const Hero = () => {
  return (
    <div className='hero'>
      <motion.div 
        className="hero-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        >
        <h1>Tokenize, Collect & Sell <br/>Marvel <span>Memes</span></h1>
        <p>World’s only platform connecting Marvel fans to brands <br/>through epic memes</p>
        <div className="button-container">
        <button className='btn1'>Explore</button>
        <button className='btn2'><img src={play} alt="play"/></button>
        <p>Watch Video</p>
        <motion.img 
          src={arrow} alt='' 
          className='arrow'
          animate={{
            y: [0, -10, 0, 10, 0], 
            x: [0, 5, 0, -5, 0], 
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 6, // further reduced duration for an even more fluid animation
            ease: "easeInOut",
            repeat: Infinity, 
            repeatType: "loop",
            stiffness: 100, // increased stiffness for an even more natural bounce
            damping: 5 // decreased damping for a more subtle decay
          }}
          />
        <img 
          src={Marvel} alt='' 
          className='marvel'
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
