import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SwapFormLiquid from '../../components/swapFormLiquid/swapFormLiquid';
import { TypeLiquid } from '../../components/swapFormLiquid/Types';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';

import './addLiquidPage.scss';

type LiquidPageProps = {
  type: TypeLiquid;
};

const LiquidPage = (props: LiquidPageProps):React.ReactElement => {
  const { type } = props;
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };

  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <SwapFormLiquid
          type={type}
        />
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default LiquidPage;
