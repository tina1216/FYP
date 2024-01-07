import { useEffect, useState } from "react";
import axios from "../services/api";

// function to fetch any data
export default function useFetch(url, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error state
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: token ? { Authorization: `${token}` } : {},
        });
        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: token ? { Authorization: `${token}` } : {},
      });
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
}
