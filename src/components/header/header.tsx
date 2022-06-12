import { FC } from 'react';
import Button from '../button/button';

import Logo from '../logo/logo';
import NavBar from '../nav/navbar';
import './header.scss';

const Header:FC = () => (
  <header className="header">
    <Logo />
    <NavBar swapCallback={() => {}} />
    <div className="header__wallet">
      <Button text="Подключить кошелек" type="button" />
    </div>
  </header>
);

export default Header;
