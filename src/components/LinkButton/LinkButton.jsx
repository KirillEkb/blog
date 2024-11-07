import classNames from 'classnames';
import { Link } from 'react-router-dom';

import classes from './LinkButton.module.scss';

function LinkButton({ text, to, pclass, onClick, disabled }) {
  return (
    <Link to={to} onClick={onClick} className={classNames(classes.link, classes[pclass])} disabled={disabled}>
      {text}
    </Link>
  );
}

export default LinkButton;
