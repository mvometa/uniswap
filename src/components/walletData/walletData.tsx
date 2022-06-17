import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

import Button from '../button/button';
import { HeaderProps } from '../header/types';

import './walletData.scss';

const WalletData = (props: HeaderProps) => {
  const { handlerConnectWallet } = props;

  const {
    success,
    adress,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const connectWallet = success
    ? (
      <div className="connect-wallet">
        Connected.Adress:
        {adress}
      </div>
    )
    : <Button text="Подключить кошелек" type="button" onPointerDown={handlerConnectWallet} />;

  return connectWallet;
};

export default WalletData;
