import { useEffect, useState } from "react";
import axios from "../services/api";

// function to fetch any data
export default function useFetch(url, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Include the Authorization header with the token
        const res = await axios.get(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    // Only fetch data if token is provided
    if (token) {
      fetchData();
    }
  }, [url, token]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
}
