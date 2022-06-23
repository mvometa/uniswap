import { FC } from 'react';

import Button from '../button/button';

import './navbar.scss';
import { NavBarPropsType } from './types';

const NavBar:FC<NavBarPropsType> = () => (
  <nav className="navbar">
    <Button text="Обменять" type="button" link="/" />
    <Button text="Добавить ликвидность в пул" type="button" link="/add" />
    <Button text="Взять ликвидность из пула" type="button" link="/" />
  </nav>
);

export default NavBar;
