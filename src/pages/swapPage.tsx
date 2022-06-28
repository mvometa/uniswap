/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SwapForm from '../components/swapForm/swapForm';
import { RootState } from '../store/store';
import { submitConnectWalletForm } from '../store/walletStore/walletConnectActions';

import './swapPage.scss';

const SwapPage = ():React.ReactElement => {
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };
  const {
    globalErrorMessage,
  } = { ...useSelector((state:RootState) => state.GlobalErrorReducer) };
  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <div className="global-error">{globalErrorMessage}</div>
        <SwapForm />
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default SwapPage;
