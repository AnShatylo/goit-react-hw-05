import css from './MovieDetailsPage.module.css';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/movies-api';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setError(false);
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Link className={css.backLink} to={backLinkRef.current} state={location}>
        <MdOutlineArrowBack /> Go back
      </Link>
      {error && <ErrorMessage />}
      {movieDetails && (
        <div className={css.movieDetailsWrap}>
          <div className={css.poster}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className={css.details}>
            <h1 className={css.title}>{movieDetails.title}</h1>
            <p className={css.userScore}>
              User score: {Math.round(movieDetails.vote_average * 10)}%
            </p>
            <div className={css.overview}>
              <h2 className={css.subtitle}>Overview</h2>
              <p>{movieDetails.overview}</p>
            </div>

            <div className={css.genres}>
              <h2 className={css.subtitle}>Genres</h2>
              <ul>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id}> {genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className={css.subInfo}>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
