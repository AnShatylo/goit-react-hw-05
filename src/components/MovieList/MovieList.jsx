import css from './MovieList.module.css';
import { Link } from 'react-router-dom';

export default function MovieList({ movies, location }) {
  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
