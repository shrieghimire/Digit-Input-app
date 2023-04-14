import React from "react";
import "./ImageUpload.css";
import { useEffect, useRef, useState } from "react";

function ImageUpload() {
  const [imageURL, setImageURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("http://127.0.0.1:8000", requestOptions).then((response) =>
      console.log(response.json())
    );
  };

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
        {imageURL && (
          <button className="identify-button" onClick={handleSubmit}>
            Identify
          </button>
        )}
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
        <button
          className="uploadImage"
          onClick={triggerUpload}
          onChange={fileChangeHandler}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
