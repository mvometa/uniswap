import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { OnChange } from 'react-final-form-listeners';

import { RootState } from '../../store/store';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
// import getPairData from '../../api/getPairData';

import Button from '../button/button';
import Spinner from '../spinner/spinner';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';

import './removeLiquidForm.scss';
import validate from './validate';
import { SwapFormData } from './Types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const RemoveLiquidForm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [fromTokenLabel, setToken1Label] = useState< TokenLabel | undefined >(undefined);
  const [toTokenLabel, setToken2Label] = useState< TokenLabel | undefined >(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, setBalance] = useState< string | undefined >(undefined);

  const {
    successWallet,
    tokenLabels,
    submittingWallet,
    errorWallet,
    tokens,
    provider,
    signer,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const {
    submittingSwapForm,
    errorSwapForm,
  } = { ...useSelector((state:RootState) => state.SwapFormReducer) };

  const handleFormSubmit = (data:SwapFormData) => {
    const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === data.fromTokenLabel.value);
    const tokenTo = tokens.find((elem:TokenInfo) => elem.name === data.toTokenLabel.value);
    if (tokenFrom && tokenTo) {
      dispatch(submitSwapForm({
        fromTokenIndex: tokenFrom,
        toTokenIndex: tokenTo,
        toTokenValue: data.toTokenValue,
        fromTokenValue: data.fromTokenValue,
        provider,
        signer,
        type: 'get',
      }));
    }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const handlerOnChangeFromTokenLabel = async (token1:TokenLabel) => {
    if (token1) {
      // const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === token1.value);
      setToken1Label(token1);
      if (toTokenLabel && token1.value !== toTokenLabel.value) {
        // const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel.value);
      }
    }
  };

  const handlerOnChangeToTokenLabel = async (token2:TokenLabel) => {
    if (token2) {
      // const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === token2.value);
      setToken2Label(token2);
      if (fromTokenLabel && token2.value !== fromTokenLabel.value) {
        // const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel.value);
      }
    }
  };

  const formButton = successWallet
    ? <Button type="submit" text="Вывести ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const spinner = (submittingWallet || submittingSwapForm) && <Spinner />;

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
                  name="fromTokenLabel"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="fromTokenLabel" />
                <OnChange name="fromTokenLabel">
                  {handlerOnChangeFromTokenLabel}
                </OnChange>
              </div>
              <div className="select-wrapper">
                <Field
                  name="toTokenLabel"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="toTokenLabel" />
                <OnChange name="toTokenLabel">
                  {handlerOnChangeToTokenLabel}
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
