import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../store/loadingSlice";

export function useFetch(fetchFn, initialValue) {
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);

  const memoizedFetchFn = useCallback(fetchFn, []);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      dispatch(startLoading());
      try {
        const data = await memoizedFetchFn();
        if (isMounted) setFetchedData(data);
      } catch (error) {
        if (isMounted)
          setError({ message: error.message || "Failed to fetch data." });
      } finally {
        dispatch(stopLoading());
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [memoizedFetchFn, dispatch]);

  return { fetchedData, error };
}
