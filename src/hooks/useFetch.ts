import { useState, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export default function useFetch<T = unknown>() {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
    setState({ data: null, error: null, loading: true });

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as T;
      setState({ data, error: null, loading: false });
    } catch (error: any) {
      setState({ data: null, error: error.message, loading: false });
    }
  }, []);

  return { ...state, fetchData };
}