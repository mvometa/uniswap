import Logo from '../logo/logo';
import NavBar from '../nav/navbar';
import WalletData from '../walletData/walletData';

import './header.scss';
import { HeaderProps } from './types';

const Header = (props: HeaderProps) => {
  const { handlerConnectWallet } = props;
  return (
    <header className="header">
      <Logo />
      <NavBar swapCallback={() => {}} />
      <div className="header__wallet">
        <WalletData handlerConnectWallet={handlerConnectWallet} />
      </div>
    </header>
  );
};

export default Header;
