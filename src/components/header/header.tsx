import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../button/button';
import Logo from '../logo/logo';
import NavBar from '../nav/navbar';

import './header.scss';
import { HeaderProps } from './types';

const Header = (props: HeaderProps) => {
  const { handlerConnectWallet } = props;
  const {
    success,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };
  const connectWallet = success
    ? <span>Connected</span>
    : <Button text="Подключить кошелек" type="button" onPointerDown={handlerConnectWallet} />;

  return (
    <header className="header">
      <Logo />
      <NavBar swapCallback={() => {}} />
      <div className="header__wallet">
        {connectWallet}
      </div>
    </header>
  );
};

export default Header;
