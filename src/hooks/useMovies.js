import { useCallback, useMemo, useRef, useState } from "react";
import { responseMovies } from "../services/movies.services";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return;
    console.log("search", search);

    try {
      setIsLoading(true);
      previousSearch.current = search;
      const response = await responseMovies({ search });
      setMovies(response);
    } catch (error) {
      setError(error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return {
    movies: sortedMovies,
    getMovies,
    isLoading,
  };
}
