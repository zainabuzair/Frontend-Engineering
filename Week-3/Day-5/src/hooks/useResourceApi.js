import { useState, useEffect } from "react";

export const useResourceApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [errorNotice, setErrorNotice] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsPending(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load snippet database.");
        return res.json();
      })
      .then((items) => {
        if (isMounted) {
          const initialSnippets = items.slice(0, 6).map((item) => ({
            id: item.id,
            title: item.title,
            category: item.id % 2 === 0 ? "React Hooks" : "Architecture",
            snippet: item.body,
            isStarred: false,
            readTime: `${(item.id % 4) + 2} min read`,
          }));
          setData(initialSnippets);
          setIsPending(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setErrorNotice(err.message);
          setIsPending(false);
        }
      });

      return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, isPending, errorNotice, setData };
};