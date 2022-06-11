import { FC } from 'react';

import Logo from '../logo/logo';
import './header.scss';

const Header:FC = () => (
  <header className="header">
    <Logo />
  </header>
);

export default Header;
