import React from "react";
import "./image.css";
import teacher from "../Image/teacher.png";

function Image() {
  return (
    <div className="background-image">
      <img src={teacher} alt="teacher.png" id="teacher" />
    </div>
  );
}

export default Image;
