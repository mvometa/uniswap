import React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import AddLiquidForm from '../../components/addLiquidForm/addLiquidForm';
import { TypeLiquid } from '../../components/addLiquidForm/Types';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';

import './addLiquidPage.scss';
import RemoveLiquidForm from '../../components/removeLiquidForm/removeLiquidForm';

type LiquidPageProps = {
  type: TypeLiquid;
};

const LiquidPage = (props: LiquidPageProps):React.ReactElement => {
  const { type } = props;
  const dispatch = useDispatch();
  const handlerConnectWallet = () => {
    dispatch(submitConnectWalletForm(true));
  };

  const form = type === 'add' ? <AddLiquidForm /> : <RemoveLiquidForm />;

  return (
    <>
      <Header handlerConnectWallet={handlerConnectWallet} />
      <main className="uniswap">
        {form}
      </main>
      <div id="background-radial-gradient" />
      <Footer />
    </>
  );
};

export default LiquidPage;
