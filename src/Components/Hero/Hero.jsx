import { motion } from 'framer-motion';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import arrow from '../../Assets/Arrow design.png';
import Marvel from '../../Assets/marvel.png';
import play from '../../Assets/play.png';
import MintNFTModal from '../MintNFTModal';
import './Hero.css';

const Hero = () => {
  // const { nft, setNftCount, setNft, setError, minting, error, mintNFT } =
  //   Web3Service(); // Ensure mintNFT is imported from Web3Service

  return (
    <div className="hero">
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Tokenize, Collect & Sell <br />
          Marvel <span>Memes</span>
        </h1>
        <p>
          World’s only platform connecting Marvel fans to brands <br />
          through epic memes
        </p>

        <div className="button-container">
          {/* Explore and Video buttons */}

          <MintNFTModal trigger={<button className="btn1">Mint</button>} />
          <button className="btn2">
            <img src={play} alt="play" />
          </button>
          <p>Watch Video</p>

          {/* Arrow and Marvel image */}
          <motion.img
            src={arrow}
            alt="Arrow"
            className="arrow"
            animate={{
              y: [0, -10, 0, 10, 0],
              x: [0, 5, 0, -5, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              stiffness: 100,
              damping: 5,
            }}
          />
          <img src={Marvel} alt="Marvel" className="marvel" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
