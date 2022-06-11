import { FC } from 'react';
import logo from './unicorn.svg';

import './logo.scss';

const Logo:FC = () => (
  <img className="logo-img" src={logo} alt="logo" />
);

export default Logo;
