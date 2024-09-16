import { motion } from "framer-motion";
import React, { useState } from "react";
import arrow from "../../Assets/Arrow design.png";
import Marvel from "../../Assets/marvel.png";
import play from "../../Assets/play.png";
import ImageDropper from "../ImageDropper";
import Web3Service from "../Web3Service";
import "./Hero.css";

const Hero = () => {
  const { nft, setNftCount, setNft, setError, minting, error, mintNFT } =
    Web3Service(); // Ensure mintNFT is imported from Web3Service
  const [showImageDropper, setShowImageDropper] = useState(false); // Controls the display of ImageDropper

  // Show ImageDropper when the Mint button is clicked
  const handleMintClick = () => {
    setShowImageDropper(true);
  };

  // Handle image and NFT name upload from ImageDropper
  const handleImageUpload = (image, nftName) => {
    mintNFT(image, nftName); // Call mintNFT with the uploaded image and name
  };

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
          {!nft ? (
            <>
              {!showImageDropper ? (
                <button
                  className="btn1"
                  onClick={handleMintClick}
                  disabled={minting}
                >
                  {minting ? "MINTING..." : "Mint"}
                </button>
              ) : (
                <ImageDropper onUpload={handleImageUpload} /> // Pass the upload function to ImageDropper
              )}
            </>
          ) : (
            <>
              <p
                style={{ color: "green", margin: "10px 0", fontWeight: 800 }}
                className="alert alert-success"
              >
                Congratulations! NFT Minted Successfully!
              </p>
              <div className="row">
                {nft.map((element) => {
                  return (
                    <img
                      className="col-2 my-3"
                      src={`https://gateway.pinata.cloud/ipfs/${element}`}
                      style={{ width: "200px", height: "200px" }}
                      alt="NFT"
                    />
                  );
                })}
              </div>
              <button
                className="btn btn-secondary"
                style={{ color: "white", marginTop: "20px" }}
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
                style={{ marginTop: "20px", fontWeight: 800 }}
                className="alert alert-danger"
              >
                {error}
              </p>
              <button
                className="btn btn-secondary"
                style={{ color: "white", marginTop: "20px" }}
                onClick={() => {
                  setError(null);
                }}
              >
                Okay
              </button>
            </>
          )}

          {/* Explore and Video buttons */}
          <button className="btn1">Explore</button>
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
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
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
