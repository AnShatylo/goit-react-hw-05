import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';

export default function App() {
  return (
    <div>
      <div className={css.header}>
        {' '}
        <Navigation />
      </div>
      <div className={css.container}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>}></Route>
          <Route path="/movies" element={<div>Movies Page</div>}></Route>
          <Route path="/movies/:movieId" element={<div>Movies Details Page</div>}>
            <Route path='cast' element={<div>Movies Cast</div>}></Route>
            <Route path='reviews' element={<div>Movies reviews</div>}></Route>
            </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}
