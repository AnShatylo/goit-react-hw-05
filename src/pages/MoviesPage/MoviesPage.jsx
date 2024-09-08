import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/movies-api';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    const movieName = e.target.elements.query.value.trim();

    if (movieName === '') {
      setError('Please, write something!');
      return;
    }
    setError('');
    params.set('query', movieName);
    setParams(params);
    e.target.reset();
  };

  useEffect(() => {
    async function fetchSearchingMovies() {
      const movieName = params.get('query') || '';

      if (!movieName) return;
      try {
        setError(false);
        const data = await searchMovies(movieName);
        setMovies(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    fetchSearchingMovies();
  }, [params]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className={css.field} type="text" name="query" />
        <button className={css.submit} type="submit">
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      {movies && (
        <ul className={css.movieList}>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
