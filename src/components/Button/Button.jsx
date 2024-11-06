import classNames from 'classnames';

import classes from './Button.module.scss';

function Button({ text, pclass, onClick, disabled, wrapClass = '' }) {
  return (
    <button
      onClick={onClick}
      className={classNames(classes.button, wrapClass, classes[pclass], disabled && classes.disabled)}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
