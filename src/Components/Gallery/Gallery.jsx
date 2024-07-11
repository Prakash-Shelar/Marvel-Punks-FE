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
      <div className='gallery-text'>
        <h1>Featured Artwork Collection</h1>
      </div>
      <div className='gallery-btn'>
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
      </div>
      <div className='gallery-img'>
        <img src={image4} alt="" className='monkey4'/>
        <img src={image5} alt="" className='monkey5'/>
        <img src={image6} alt="" className='monkey6'/>
        <button className='btn-arrow-left'><img src={left_arrow} alt="" className='left-arrow' /></button>
        <button className='btn-arrow-right'><img src={right_arrow} alt="" className='right-arrow' /></button>
      </div>
      <div className='container-line'>
        <div className='line4'></div>
      </div>
    </div>
  )
}

export default Gallery
