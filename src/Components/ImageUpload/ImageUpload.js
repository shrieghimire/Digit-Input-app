import React from "react";
import "./ImageUpload.css";
import { useEffect, useRef, useState } from "react";

function ImageUpload() {
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef();
  const imageRef = useRef();
  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };
  const triggerUpload = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {}, []);

  return (
    <div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && (
              <div className="uploadedImage">
                <img
                  src={imageURL}
                  alt="uploaded-img"
                  crossOrigin="anonymous"
                  ref={imageRef}
                />
              </div>
            )}
          </div>
        </div>
        {imageURL && <button className="identify-button">Identify</button>}
      </div>
      <div className="inputHolder">
        {/* this input hidden while styling */}
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={triggerUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
