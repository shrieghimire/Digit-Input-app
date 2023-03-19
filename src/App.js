import DrawingBoard from "./Components/DrawingBoard/DrawingBoard";
import Image from "./Components/Image/Image";
import "./Components/Image/image.css";

function App() {
  return (
    <>
      <div className="image">
        <Image />
        <div>
          <DrawingBoard />
        </div>
      </div>
    </>
  );
}

export default App;
