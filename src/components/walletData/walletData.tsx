import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getBalance, { getBalanceOfToken } from '../../api/getBalance';

import { RootState } from '../../store/store';
import { tokens } from '../../utils/constants';

import Button from '../button/button';
import { HeaderProps } from '../header/types';

import './walletData.scss';

const WalletData = (props: HeaderProps) => {
  const { handlerConnectWallet } = props;

  const {
    success,
    adress,
    provider,
    signer,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const [balance, setBalance] = useState<undefined | string>(undefined);
  useEffect(() => {
    if (provider && signer) {
      getBalance('0x781F8B032eFd365e56EC96564874937966Fb00e1', provider).then((bal) => setBalance(bal));
      console.log(getBalanceOfToken(tokens[1], provider, signer));
    }
  });

  const connectWallet = success
    ? (
      <div className="connect-wallet">
        Connected.Adress:
        {adress}
        Balance:
        {balance}
      </div>
    )
    : <Button text="Подключить кошелек" type="button" onPointerDown={handlerConnectWallet} />;

  return connectWallet;
};

export default WalletData;
