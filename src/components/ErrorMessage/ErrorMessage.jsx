import { BiError } from 'react-icons/bi';
import css from './ErrorMessage.module.css';

export default function ErrorMesage() {
  return (
    <div>
      <p className={css.error}>
        <BiError />
        Sorry, something goes wrong.
      </p>
    </div>
  );
}