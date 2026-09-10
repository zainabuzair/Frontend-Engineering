import { useState, useEffect } from "react";

export const useFetchUsers = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server response error: ${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        if (isMounted) {
          setData(users);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load user records.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; 
    };
  }, [url]);

  return { data, loading, error };
};