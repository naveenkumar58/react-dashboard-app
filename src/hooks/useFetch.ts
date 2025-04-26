import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
}

export default function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as T;

        if (isMounted) {
          setState({ data, error: null });
        }
      } catch (error: any) {
        if (isMounted) {
          setState({ data: null, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up to avoid setting state after unmount
    };
  }, [url, options]);

  return state;
}