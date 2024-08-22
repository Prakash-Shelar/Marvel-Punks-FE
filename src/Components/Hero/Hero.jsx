import React from 'react'
import './Hero.css'
import { motion } from 'framer-motion';
import play from '../../Assets/play.png';
import arrow from '../../Assets/Arrow design.png';
import Marvel from '../../Assets/marvel.png';
import Web3Service from '../Web3Service';
const Hero = () => {
  const { nft, setNftCount, setNft, setError, minting, error, handleSubmit } = Web3Service();

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
        {!nft ? (
        <button className='btn1' onClick={handleSubmit} disabled={minting}>
            {minting ? 'MINTING...' : 'Mint'}
        </button>
        ) : (
          <>
            <p
              style={{ color: 'green', margin: '10px 0', fontWeight: 800 }}
              className="alert alert-success"
            >
              Congratulations! NFT Minted Succesfully!
            </p>
            <div className="row">
              {nft.map((element) => {
                return (
                  <img
                    className="col-2 my-3"
                    src={`https://gateway.pinata.cloud/ipfs/${element}`}
                    style={{ width: '200px', height: '200px' }}
                    alt="NFT"
                  />
                );
              })}
            </div>
            <button
              className="btn btn-secondary"
              style={{ color: 'white', marginTop: '20px' }}
              onClick={() => {
                setNft(null);
                setNftCount(1);
              }}
            >
              Okay
            </button>
          </>
        )}
        {error && (
          <>
            <p
              style={{ marginTop: '20px', fontWeight: 800 }}
              className="alert alert-danger"
            >
              {error}
            </p>
            <button
              className="btn btn-secondary"
              style={{ color: 'white', marginTop: '20px' }}
              onClick={() => {
                setError(null);
              }}
            >
              Okay
            </button>
          </>
        )}

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
