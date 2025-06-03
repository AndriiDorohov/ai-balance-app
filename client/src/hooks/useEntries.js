import { useEffect, useState, useCallback } from "react";
import { getEntries, getAllEntries } from "../api/entryService";

export function useEntries(token, filterValues) {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const resetAndFetch = async () => {
      setLoading(true);
      setError(null);
      setEntries([]);
      setSkip(0);
      setHasMore(true);

      try {
        let fetched;
        if (filterValues.mood !== "all") {
          fetched = await getAllEntries(token, filterValues);
          setHasMore(false);
        } else {
          fetched = await getEntries(token, {
            ...filterValues,
            skip: 0,
            limit: 10,
          });
          setHasMore(fetched.length === 10);
        }

        setEntries(fetched);
        setSkip(fetched.length);
      } catch {
        setError("Failed to fetch entries");
      } finally {
        setLoading(false);
      }
    };

    if (token) resetAndFetch();
  }, [token, filterValues]);

  const fetchMore = useCallback(async () => {
    if (filterValues.mood !== "all" || !hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const newEntries = await getEntries(token, {
        ...filterValues,
        skip,
        limit: 10,
      });

      setEntries((prev) => [...prev, ...newEntries]);
      setSkip((prev) => prev + newEntries.length);
      if (newEntries.length < 10) setHasMore(false);
    } catch {
      setError("Failed to fetch entries");
    } finally {
      setIsLoadingMore(false);
    }
  }, [token, filterValues, skip, hasMore, isLoadingMore]);

  useEffect(() => {
    const fetchAll = async () => {
      if (token && filterValues.mood === "all") {
        try {
          const result = await getAllEntries(token, filterValues);
          setAllEntries(result);
        } catch {
          setAllEntries([]);
        }
      } else {
        setAllEntries([]);
      }
    };

    fetchAll();
  }, [token, filterValues]);

  return {
    entries,
    setEntries,
    allEntries,
    loading,
    error,
    fetchMore,
    hasMore,
    isLoadingMore,
    setAllEntries,
  };
}
