import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { WalletContext } from "./WalletContext";

const web3 = new Web3(window.ethereum);

const abi = [
  
]

const Web3Service = () => {
  const [nft, setNft] = useState(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState(null);
  const WalletAddress = useContext(WalletContext);
  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const mintNFT = async (pinataHash, nftName) => {
    if (!window.ethereum || !window.ethereum.selectedAddress) {
      alert("Please install MetaMask and connect your wallet.");
      return;
    }

    if (!contract) {
      alert("Contract not initialized.");
      return;
    }

    setMinting(true);

    try {
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${pinataHash}`;
      console.log("NFT Image URL:", imageUrl);

      const metadata = {
        name: nftName,
        image: imageUrl,
        by: WalletAddress.address,
      };

      let pinataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
          },
        }
      );
      console.log("-----------------", pinataResponse.data.IpfsHash);
      console.log("Wallet address: ", WalletAddress.address);

      await contract.methods.mint(pinataResponse.data.IpfsHash).send({
        from: WalletAddress.address,
      });

      setNft([pinataResponse.data.IpfsHash]);
    } catch (err) {
      console.log(err);
      toast.error("Minting failed. Please try again.");
    }

    setMinting(false);
  };

  return { mintNFT, nft, minting, error, setError, setNft };
};

export default Web3Service;
