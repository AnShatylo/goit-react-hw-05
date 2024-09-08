import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setError(false);
        const response = await getMovieCast(movieId);
        setMovieCast(response);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {error && <ErrorMessage />}
      {movieCast && (
        <>
          {movieCast.cast.map(cast => (
            <div key={cast.id} className={css.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                alt={cast.name}
                className={css.castImage}
              />
              <p className={css.castName}>{cast.name}</p>
              <p>{cast.character}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
