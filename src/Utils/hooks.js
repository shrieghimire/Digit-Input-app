import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  //API call in this useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export { useFetch };
