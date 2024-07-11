import React from 'react'
import './Gallery.css'
import image4 from '../../Assets/monkey4.png';
import image5 from '../../Assets/monkey5.png';
import image6 from '../../Assets/monkey6.png';
import right_arrow from '../../Assets/arrow-right.png';
import left_arrow from '../../Assets/arrow-left.png';
const Gallery = () => {
  return (
    <div className='gallery'>
      <Motion.div
        className='gallery-text'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
       >
        <h1>Featured Artwork Collection</h1>
      </Motion.div>
      <motion.div
        className='gallery-btn'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
      <button className='gradient-button'>
            All NFTs
        </button>
        <button className='gradient-button'>
            Art
        </button>
        <button className='gradient-button'>
            Collection
        </button>
        <button className='gradient-button'>
            Visual World
        </button>
        <button className='gradient-button'>
            Trending Cards
        </button>
      </motion.div>
      <motion.div
        className='gallery-img'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
        <img src={image4} alt="" className='monkey4'/>
        <img src={image5} alt="" className='monkey5'/>
        <img src={image6} alt="" className='monkey6'/>
        <button className='btn-arrow-left'><img src={left_arrow} alt="" className='left-arrow' /></button>
        <button className='btn-arrow-right'><img src={right_arrow} alt="" className='right-arrow' /></button>
      </motion.div>
      <motion.div
        className='container-line'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
        <div className='line4'></div>
      </motion.div>
    </div>
  )
}

export default Gallery
