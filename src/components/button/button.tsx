import { FC } from 'react';
import { Link } from 'react-router-dom';

import './button.scss';
import { ButtonProps } from './types';

const Button:FC<ButtonProps> = (props) => {
  const {
    text,
    type,
    link,
    isDisabled,
    onPointerDown,
  } = props;
  const btnClassName = `button ${link === undefined ? 'button_type_base' : 'button_type_link'}`;
  return link === undefined
    ? (
      <button
        className={btnClassName}
        disabled={isDisabled}
        type={type === 'button' ? 'button' : 'submit'}
        onPointerDown={onPointerDown}
      >
        {text}
      </button>
    ) : (<Link className={btnClassName} to={link}>{text}</Link>);
};

export default Button;
