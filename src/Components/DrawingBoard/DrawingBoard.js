import "./DrawingBoard.css";
import { useEffect, useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext("2d");
    context.fillStyle = "black"; // set background color to black
    context.fillRect(0, 0, canvas.width, canvas.height); // fill the entire canvas with black

    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 2;
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

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
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
      <div className="mainWrapper"> 
        <div className="mainContent">
          <div className="imageHolder">
            <img src= {imageURL}/>
          </div>
        </div>
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
      </div>
      <div className="inputHolder">
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
};

export default DrawingCanvas;
