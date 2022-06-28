import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { OnChange } from 'react-final-form-listeners';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';

import Button from '../button/button';
import Spinner from '../spinner/spinner';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';

import './removeLiquidForm.scss';
import validate from './validate';
import { RemoveLiquidFormData } from './Types';
import { submitProportions } from '../../store/pairsStore/pairsConnectActions';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const RemoveLiquidForm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromTokenLabel, setToken1Label] = useState< TokenLabel | undefined >(undefined);
  const [toTokenLabel, setToken2Label] = useState< TokenLabel | undefined >(undefined);
  const [balance, setBalance] = useState< string | undefined >(undefined);

  const {
    successWallet,
    tokenLabels,
    submittingWallet,
    errorWallet,
    tokens,
    provider,
    signer,
    adressWallet,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const {
    submittingSwapForm,
    errorSwapForm,
    successSwapForm,
  } = { ...useSelector((state:RootState) => state.SwapFormReducer) };

  const {
    proportions,
    submittingPairs,
  } = { ...useSelector((state:RootState) => state.PairsConnectReducer) };

  useEffect(() => {
    if (successSwapForm) {
      navigate(0);
    }
    if (proportions && proportions.userBalance) {
      setBalance(Number(proportions?.userBalance).toFixed(6));
    }
  }, [successSwapForm, proportions]);

  const handleFormSubmit = (data:RemoveLiquidFormData) => {
    const token1 = tokens.find((elem:TokenInfo) => elem.name === data.token1Label.value);
    const token2 = tokens.find((elem:TokenInfo) => elem.name === data.token2Label.value);
    if (token1 && token2) {
      dispatch(submitSwapForm({
        balanceToRemove: data.balanceToRemove,
        toTokenIndex: token2,
        fromTokenIndex: token1,
        type: 'get',
        fromTokenValue: 0,
        toTokenValue: 0,
        provider,
        signer,
      }));
    }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const handlerOnChangeToken1Label = async (token1:TokenLabel) => {
    if (token1) {
      const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === token1.value);
      setToken1Label(token1);
      if (toTokenLabel && token1.value !== toTokenLabel.value) {
        const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel.value);
        const dataToSubmit = {
          token1adress: tokens[tokenFrom].adress,
          token2adress: tokens[tokenTo].adress,
          userWalletAdress: adressWallet,
          provider,
          signer,
        };
        dispatch(submitProportions(dataToSubmit));
      }
    }
  };

  const handlerOnChangeToken2Label = async (token2:TokenLabel) => {
    if (token2) {
      const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === token2.value);
      setToken2Label(token2);
      if (fromTokenLabel && token2.value !== fromTokenLabel.value) {
        const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel.value);
        const dataToSubmit = {
          token1adress: tokens[tokenFrom].adress,
          token2adress: tokens[tokenTo].adress,
          userWalletAdress: adressWallet,
          provider,
          signer,
        };
        if (proportions) {
          setBalance(Number(proportions?.userBalance).toFixed(6));
        }
        dispatch(submitProportions(dataToSubmit));
      }
    }
  };

  const formButton = successWallet
    ? <Button type="submit" text="Вывести ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;
  const spinner = (submittingWallet || submittingSwapForm || submittingPairs) && <Spinner />;

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">Вывести ликвидность</h2>
      {spinner}
      <Form onSubmit={handleFormSubmit} validate={validate}>
        {({ handleSubmit }) => (
          <form className="swap-form-remove__form" onSubmit={handleSubmit}>
            <div className="swap-form-remove__label-wrapper">
              <div className="select-wrapper">
                <Field
                  name="token1Label"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="token1Label" />
                <OnChange name="token1Label">
                  {handlerOnChangeToken1Label}
                </OnChange>
              </div>
              <div className="select-wrapper">
                <Field
                  name="token2Label"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="token2Label" />
                <OnChange name="token2Label">
                  {handlerOnChangeToken2Label}
                </OnChange>
              </div>
            </div>
            <label className="swap-form-remove__label">
              <Field
                name="balanceToRemove"
                component="input"
                type="text"
                placeholder="0.0"
                className="swap-form__input"
                validate={requiredNotEmpty}
              />
              <ErrorForm name="balanceToRemove" />
              <div className="swap-form__balance">
                Баланс пары:
                {balance}
              </div>
            </label>
            <span
              className="swap-form-remove__error"
              style={(errorWallet || errorSwapForm) ? { display: 'block' } : { display: 'none' }}
            >
              Error.
            </span>
            {formButton}
          </form>
        )}
      </Form>
    </div>
  );
};

export default RemoveLiquidForm;
