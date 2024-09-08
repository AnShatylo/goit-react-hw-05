import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setError(false);
        const response = await getMovieReviews(movieId);
        setMovieReviews(response);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  const hasReviews =
    movieReviews && movieReviews.results && movieReviews.results.length > 0;

  return (
    <>
      {error && <ErrorMessage />}
      {hasReviews ? (
        <>
          {movieReviews.results.map(review => (
            <div key={review.id} className={css.reviewItem}>
              <p>{review.author_details.rating}</p>
              <p className={css.reviewName}>{review.author}</p>
              <p>{review.content}</p>
            </div>
          ))}
        </>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
}
