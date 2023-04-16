import React from "react";
import "./ImageUpload.css";
import axios from "axios";
import { useRef, useState } from "react";

function ImageUpload() {
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axios.post(
        "http://localhost:8000/image-upload",
        formData
      );
      setPrediction(response.data.Prediction);
    } catch (error) {
      console.log(error);
    }
  };

  const getFileInfo = (e) => {
    const { files } = e.target;

    //to display the chosen file in the screen
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      setImage(files[0]);
    } else {
      setImageURL(null);
    }
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
      </div>
      <div className="inputHolder">
        <div className="uploadInput">
          <input
            type="file"
            name="file"
            accept="image/*"
            capture="camera"
            onChange={getFileInfo}
          />
        </div>
        <button className="uploadButton" onClick={handleUpload}>
          Classify
        </button>
      </div>
      {prediction && (
        <div className="predictionHolder">
          <h2>Prediction: {prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
