import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import arrow from "../../Assets/Arrow design.png";
import Marvel from "../../Assets/marvel.png";
import play from "../../Assets/play.png";
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

  const [pinataHash, setPinataHash] = useState("");

  const [uploading, setUploading] = useState(false);

  const [nftName, setNftName] = useState("");

  const [nftNameEntered, setNftNameEntered] = useState(false);

  const handleNftNameSubmit = () => {
    if (nftName.trim()) {
      console.log("NFT name submitted:", nftName);
      setNftNameEntered(true); // Set to true when the name is entered
      setError("");
    } else {
      toast.error("Please enter a name for the NFT.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleFileUpload = async (e, nftName) => {
    try {
      setUploading(true);
      let data = new FormData();
      data.append("file", e.target.files[0]);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
          },
        }
      );

      const { IpfsHash } = response.data;
      console.log("-----------------------", IpfsHash);
      setUploading(false);
      setPinataHash(IpfsHash);
      setError("");
      toast.success("Image Uploaded Successfully!");
      mintNFT(pinataHash, nftName);
    } catch (e) {
      toast.error("Couldn't upload to pinata, please try again." + e);
    }
  };
  // Handle image and NFT name upload from ImageDropper
  // const handleImageUpload = (pinataHash, nftName) => {
  //   mintNFT(pinataHash, nftName); // Call mintNFT with the uploaded image and name
  // };

  const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 150px;
    margin: 0;
    border-radius: 20px;
    background-color: #d201de;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background-color: #b902c2;
    }
  `;

  const InputLabel = styled.p`
    color: black;
    margin-top: 10px;
    font-size: 16px;
  `;

  const Input = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
      border-color: #aaa;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    &[type="file"] {
      headname: #fff;
    }
  `;

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
              ) : !nftNameEntered ? (
                <InputContainer>
                  <InputLabel>Enter NFT Name</InputLabel>
                  <Input
                    type="text"
                    value={nftName}
                    onChange={(e) => {
                      console.log("Current NFT name:", e.target.value);
                      setNftName(e.target.value);
                    }}
                    placeholder="Enter NFT Name"
                    // disabled={uploading}  <-- Disabled condition temporarily removed
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleNftNameSubmit}
                    style={{
                      marginTop: "10px",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      background: "linear-gradient(to right, #7317a8, #550984)",
                      borderRadius: "20px",
                      fontSize: "15px",
                      fontWeight: 600,
                      transition: "0.3s ease, transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    Submit Name
                  </button>
                </InputContainer>
              ) : (
                <InputContainer>
                  <InputLabel>
                    Upload Image {uploading && "(Uploading...)"}
                  </InputLabel>
                  <Input type="file" onChange={handleFileUpload} />
                </InputContainer>
                // <ImageDropper onUpload={handleImageUpload} /> // Pass the upload function to ImageDropper
              )}
            </>
          ) : (
            <>
              {toast.success("Congratulations! NFT Minted Successfully!", {
                position: "top-center",
              })}
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
