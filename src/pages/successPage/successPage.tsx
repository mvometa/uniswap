/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';

import './successPage.scss';

const SuccessPage = ():React.ReactElement => {
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };
  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <h1 className="uniswap__success">Успешная транзакция</h1>
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default SuccessPage;
