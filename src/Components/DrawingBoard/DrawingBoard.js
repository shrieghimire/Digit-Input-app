import "./DrawingBoard.css";
import { useEffect, useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
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
    let link = event.currentTarget;
    link.setAttribute("download", "number.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <div >
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
        <button className="reset-button" onClick={setToErase}>Reset</button>
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
    </div>
  );
};

export default DrawingCanvas;
