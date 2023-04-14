import React, { useState, useEffect } from "react";
import axios from "axios";

function Prediction() {
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    try {
      let res = await axios.get("http://localhost:8000");
      let result = res.data;
      setResult(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="result">{result}</div>
    </div>
  );
}

export default Prediction;
