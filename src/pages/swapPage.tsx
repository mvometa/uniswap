import React from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/footer/footer';
import GlobalError from '../components/globalError/globalError';
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
        <GlobalError />
        <SwapForm />
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default SwapPage;
