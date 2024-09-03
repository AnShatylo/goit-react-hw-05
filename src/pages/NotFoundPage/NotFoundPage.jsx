import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.title}>404</h1>
      <h2 className={css.subTitle}>Not found!</h2>

      <p className={css.descr}>
        Oops! It looks like the page you’re trying to reach doesn’t exist. It
        might have been moved or deleted.
      </p>
      <Link to="/" className={css.backHome}>Back Home</Link>
    </div>
  );
}
