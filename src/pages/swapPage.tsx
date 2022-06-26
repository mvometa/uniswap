/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SwapForm from '../components/swapForm/swapForm';
import { submitConnectWalletForm } from '../store/walletStore/walletConnectActions';

import './swapPage.scss';

const SwapPage = ():React.ReactElement => {
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };
  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <SwapForm />
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default SwapPage;
