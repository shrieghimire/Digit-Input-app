import DrawingBoard from "./Components/DrawingBoard/DrawingBoard";
import Image from "./Components/Image/Image";
import "./Components/Image/image.css";
import ImageUpload from "./Components/ImageUpload/ImageUpload";
import ImagePrediction from "./Components/ImagePrediction/prediction";

function App() {
  return (
    <>
      <Image />
      <DrawingBoard />
      <ImageUpload />
      <ImagePrediction />
    </>
  );
}

export default App;
