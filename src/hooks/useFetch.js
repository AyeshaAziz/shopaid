import { useEffect, useState } from "react";
const NULL_VALUE ='';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(NULL_VALUE);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setError(NULL_VALUE);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
        setError(e.message);
      }
    };

    getData();
  }, [url]);
  return { data, loading, error };
};
