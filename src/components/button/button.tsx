import { FC } from 'react';
import './button.scss';
import { ButtonProps } from './types';

const Button:FC<ButtonProps> = (props) => {
  const { text, type } = props;
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
    >
      {text}
    </button>
  );
};

export default Button;
