import { FC } from 'react';
import './navbar.scss';
import { NavBarPropsType } from './types';

const NavBar:FC<NavBarPropsType> = (props) => {
  const { swapCallback } = props;

  return (
    <nav className="navbar">
      <button
        type="button"
        onPointerDown={swapCallback}
      >
        Обменять
      </button>
    </nav>
  );
};

export default NavBar;
