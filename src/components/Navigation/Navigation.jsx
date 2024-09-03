import { NavLink } from 'react-router-dom';

import clsx from 'clsx';
import css from './Navigation.module.css';

const navClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};

export default function Navigation() {
  return (
    <ul className={css.nav}>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies" className={navClass}>
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
