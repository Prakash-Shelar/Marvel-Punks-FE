import React, { useState } from "react";
import "./ImageDropper.css";

const ImageDropper = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  const [nftName, setNftName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const updatedImages = [...images];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedImages.push(reader.result);
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadClick = () => {
    setShowInput(true);
  };

  const handleUpload = () => {
    if (nftName.trim() && images.length > 0) {
      onUpload(images[0], nftName); // Pass the image and name to Web3Service
    } else {
      alert("Please upload an image and enter a name.");
    }
  };

  return (
    <div>
      <div className="drop-zone">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="preview-wrapper">
              <img
                src={image}
                alt={`Preview ${index}`}
                className="preview-image"
              />
            </div>
          ))
        ) : (
          <p>
            Drag and drop images here, or{" "}
            <span
              onClick={() => document.getElementById("fileInput").click()}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              browse
            </span>
          </p>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {images.length > 0 && !showInput && (
        <button className="upload-button" onClick={handleUploadClick}>
          Upload Images
        </button>
      )}

      {showInput && (
        <div className="nft-input">
          <input
            type="text"
            placeholder="Enter NFT name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
          />
          <button className="submit-button" onClick={handleUpload}>
            Submit NFT
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDropper;
