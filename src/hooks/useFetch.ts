import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint: string) => {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);

  async function fetchData() {
    const response = await axios.get(endpoint, {});

    // console.log("test : ");
    // console.log(response.data.data);
    setData(response.data.data);
    setIsData(true);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      // console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isData };
};

export default useFetch;
