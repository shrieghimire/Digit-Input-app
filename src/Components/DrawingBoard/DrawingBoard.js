import "./DrawingBoard.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [predictedValue, setPredictedValue] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext("2d");
    context.fillStyle = "black"; // set background color to black
    context.fillRect(0, 0, canvas.width, canvas.height); // fill the entire canvas with black

    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 1.5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };
  const predictImage = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/*");  
    try {
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const image = new File([blob], "image", { type: "image/png" });
      
      const formData = new FormData();
      formData.append("file", image);
      
      const predictResponse = await axios.post("http://localhost:8000/image-upload", formData);
      console.log(predictResponse.data.Prediction);
      setPredictedValue(predictResponse.data.Prediction);
    } catch (error) {
      console.log(error);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
    checkCanvasEmpty();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToErase = () => {
    window.location.reload(false);
  };

  const saveImageToLocal = (event) => {
    const link = event.currentTarget;
    link.setAttribute("download", "number.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };
  const checkCanvasEmpty = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i++) {
      if (imageData.data[i] !== 0) {
        setIsCanvasEmpty(false);
        return;
      }
    }

    setIsCanvasEmpty(true);
  };
  return (
    <div>
      <div className="drawing-box">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </div>

      <div className="buttons">
        <button className="reset-button" onClick={setToErase}>
          Reset
        </button>

        <button className="download-button">
          <a
            id="download_image_link"
            href="download_link"
            onClick={saveImageToLocal}
          >
            Download
          </a>
        </button>
        {!isCanvasEmpty && (
          <button className="predict-button" onClick={predictImage}>
            Predict
          </button>
        )}
      </div>
      <div id="prediction"><h2
      >Prediction: {predictedValue}</h2></div>
    </div>
  );
};

export default DrawingCanvas;
