import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/footer/footer';
import GlobalError from '../../components/globalError/globalError';
import Header from '../../components/header/header';
import SwapFormLiquid from '../../components/swapFormLiquid/swapFormLiquid';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';

import './addLiquidPage.scss';

const AddLiquidPage = ():React.ReactElement => {
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };
  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <GlobalError />
        <SwapFormLiquid />
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default AddLiquidPage;
