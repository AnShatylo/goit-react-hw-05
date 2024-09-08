import css from './MovieDetailsPage.module.css';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/movies-api';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

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
      <Link to={backLinkRef.current} state={location}>
        <MdOutlineArrowBack /> Go back
      </Link>
      {error && <ErrorMessage />}
      {movieDetails && (
        <div className={css.movieDetailsWrap}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
          />
          <h1>{movieDetails.title}</h1>
          <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <div className={css.overview}>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
          </div>
          <div className={css.genres}>
            <h2>Genres</h2>
            <ul>
              {movieDetails.genres.map(genre => (
                <li key={genre.id}> {genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

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
  );
}
