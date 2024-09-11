import { useState, useEffect } from 'react';
import { getMovies } from '../../services/movies-api';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setError(false);
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </>
  );
}
