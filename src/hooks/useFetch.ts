import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

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

  /**
   * fetch ddata
   * - Return a data having the type of {data:<T>, error, loading}
   */
  const fetchData = useCallback(
    async (url: string, config?: AxiosRequestConfig) => {
      setState({ data: null, error: null, loading: true });

      try {
        const response = await axios.get<T>(url);
        setState({ data: response.data, error: null, loading: false });
      } catch (error: any) {
        setState({ data: null, error: error, loading: false });
      }
    },
    []
  );

  return { ...state, fetchData };
}
