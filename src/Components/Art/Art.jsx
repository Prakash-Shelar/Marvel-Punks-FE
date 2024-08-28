import React from 'react'
import './Art.css'
import { motion } from 'framer-motion';
import right_arrow from '../../Assets/arrow-right.png';
import image1 from '../../Assets/monkey1.jpg';
import image2 from '../../Assets/monkey2.jpg';
import image3 from '../../Assets/monkey3.png';
import left_arrow from '../../Assets/arrow-left.png';

const Art = () => {
  return (
    <div className='art'>
  <motion.div
    className='container-art'
    initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.1 }}
    >
    <button className='btn-arrow'><img src={left_arrow} alt="" className='left-arrow' /></button>
    <img src={image3} alt="" className='monkey3'/>
    <img src={image2} alt="" className='monkey2'/>
    <img src={image1} alt="" className='monkey1' />
    <button className='btn-arrow2'><img src={right_arrow} alt="" className='right-arrow'/></button>
  </motion.div>
  <motion.div
    className='container-text'
    initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.1 }}
    >
    <h1>Turn Your <span>Memes</span> Into Crypto Tokens</h1>
    <p>With MarvelPunks, you can monetize your creativity and sarcasm. We make it easy to tokenize and sell your meme.</p>
    <button className='btn1'>View More</button>
  </motion.div>
  <motion.div
    className='container-line'
    initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.1 }}
    >
    <div className='line3'></div>
  </motion.div>
</div>

  )
}

export default Art
