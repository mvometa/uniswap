/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddLiquidForm from '../components/addLiquidForm/addLiquidForm';
import { TypeLiquid } from '../components/addLiquidForm/Types';

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import RemoveLiquidForm from '../components/removeLiquidForm/removeLiquidForm';
import SwapForm from '../components/swapForm/swapForm';
import { RootState } from '../store/store';
import { submitConnectWalletForm } from '../store/walletStore/walletConnectActions';

import './swapPage.scss';

type SwapPageProps = {
  type: TypeLiquid;
};

const SwapPage = (props: SwapPageProps):React.ReactElement => {
  const { type } = props;
  let form;
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };

  if (type === 'add') {
    form = <AddLiquidForm />;
  } else if (type === 'get') {
    form = <RemoveLiquidForm />;
  } else form = <SwapForm />;

  const {
    globalErrorMessage,
  } = { ...useSelector((state:RootState) => state.GlobalErrorReducer) };

  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        <div className="global-error">{globalErrorMessage}</div>
        {form}
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default SwapPage;
