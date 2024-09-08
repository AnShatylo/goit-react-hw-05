import { useState, useEffect } from 'react';
import { getMovies } from '../../services/movies-api';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';
import { Link } from 'react-router-dom';

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
    {movies && 
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
        }
    </>
  );
}
