import React, { useState } from 'react';
import { Field, FieldMetaState, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { OnChange } from 'react-final-form-listeners';
import downArrow from './down-arrow.svg';
import './swapForm.scss';
import validate from './validate';

import Button from '../button/button';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { RootState } from '../../store/store';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';
import { SwapFormData } from './Types';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';

import Spinner from '../spinner/spinner';
import { submitProportions } from '../../store/pairsStore/pairsConnectActions';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapForm = ():React.ReactElement => {
  const dispatch = useDispatch();

  const {
    successWallet,
    tokenLabels,
    provider,
    signer,
    submittingWallet,
    errorWallet,
    tokens,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fee,
    adressWallet,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const {
    submittingSwapForm,
    errorSwapForm,
  } = { ...useSelector((state:RootState) => state.SwapFormReducer) };

  const {
    proportions,
    submittingPairs,
  } = { ...useSelector((state:RootState) => state.PairsConnectReducer) };

  const [balance1token, setBalance1token] = useState< number | undefined >(undefined);
  const [balance2token, setBalance2token] = useState< number | undefined >(undefined);
  const [fromTokenLabel, setToken1Label] = useState< TokenLabel | undefined >(undefined);
  const [toTokenLabel, setToken2Label] = useState< TokenLabel | undefined >(undefined);

  console.log(proportions);

  const handleFormSubmit = (data:SwapFormData) => {
    const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === data.fromTokenLabel.value);
    const tokenTo = tokens.find((elem:TokenInfo) => elem.name === data.toTokenLabel.value);
    if (tokenFrom && tokenTo) {
      dispatch(submitSwapForm({
        toTokenIndex: tokenTo,
        fromTokenIndex: tokenFrom,
        toTokenValue: data.toTokenValue,
        fromTokenValue: data.fromTokenValue,
        slippage: data.slippage,
        provider,
        signer,
      }));
    }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const formButton = successWallet
    ? <Button type="submit" text="Поменять пару" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const validationBlock = (meta: FieldMetaState<number>) => (
    meta.error
    && meta.touched
    && <span className="swap-form__error">{meta.error}</span>
  );

  const handleSelectChangeTokenFrom = (item:TokenLabel) => {
    if (item) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const index = tokens.findIndex((elem:TokenInfo) => elem.name === item.value);
    }
  };

  const handleMaxClick = () => {
    console.log('handleMaxClick');
  };

  const handlerOnChangeFromTokenLabel = (token1:TokenLabel) => {
    if (token1) {
      const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === token1.value);
      setBalance1token(tokens[tokenFrom].balance);
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

  const handlerOnChangeToTokenLabel = async (token2:TokenLabel) => {
    if (token2) {
      const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === token2.value);
      setBalance2token(tokens[tokenTo].balance);
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
        dispatch(submitProportions(dataToSubmit));
      }
    }
  };

  const spinner = (submittingWallet || submittingSwapForm || submittingPairs) && <Spinner />;
  const balance1 = balance1token === undefined ? null : Number(balance1token).toFixed(6);
  const balance2 = balance2token === undefined ? null : Number(balance2token).toFixed(6);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maxButton = successWallet && (
    <button
      className="swap-form__max-button"
      onClick={handleMaxClick}
      type="button"
    >
      <span className="max-value">
        {`Максимум: ${0}`}
      </span>
    </button>
  );

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">Обменять</h2>
      {spinner}
      <Form onSubmit={handleFormSubmit} validate={validate}>
        {({ handleSubmit }) => (
          <form className="swap-form__form" onSubmit={handleSubmit}>
            <div className="swap-form__label-wrapper">
              <label className="swap-form__label">
                <Field
                  name="fromTokenValue"
                  component="input"
                  type="text"
                  placeholder="0.0"
                  className="swap-form__input"
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="fromTokenValue" />
              </label>
              <div className="select-wrapper select-wrapper_first">
                <Field
                  name="fromTokenLabel"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                  onSelectCallback={handleSelectChangeTokenFrom}
                />
                <ErrorForm name="fromTokenLabel" />
                <OnChange name="fromTokenLabel">
                  {handlerOnChangeFromTokenLabel}
                </OnChange>
              </div>
              <div className="swap-form__balance">
                Баланс:
                {balance1}
              </div>
            </div>
            <div className="swap-form__arrow">
              <img className="swap-form__arrow-down" src={downArrow} alt="arrow down" />
            </div>
            <div className="swap-form__label-wrapper">
              <label className="swap-form__label">
                <Field
                  name="toTokenValue"
                  component="input"
                  type="text"
                  placeholder="0.0"
                  className="swap-form__input"
                  validate={requiredNotEmpty}
                />
                <ErrorForm name="toTokenValue" />
              </label>
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
              <div className="swap-form__balance">
                Баланс:
                {balance2}
              </div>
            </div>
            <Field name="slippage">
              {({ input, meta }) => (
                <label className="swap-form__label">
                  Введите проскальзывание в %:
                  <input
                    className="swap-form__input"
                    {...input}
                    type="text"
                    placeholder="0.0"
                  />
                  {validationBlock(meta)}
                </label>
              )}
            </Field>
            <span
              className="swap-form__error"
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

export default SwapForm;
