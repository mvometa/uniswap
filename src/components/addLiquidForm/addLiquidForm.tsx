import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { OnChange } from 'react-final-form-listeners';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';
import BigNumber from '../../constants/bigNumberConfig';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
import { submitProportions } from '../../store/pairsStore/pairsConnectActions';

import Button from '../button/button';
import Spinner from '../spinner/spinner';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';

import './addLiquidForm.scss';
import validate from './validate';
import { SwapFormData } from './Types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const AddLiquidForm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromTokenLabel, setToken1Label] = useState< TokenLabel | undefined >(undefined);
  const [toTokenLabel, setToken2Label] = useState< TokenLabel | undefined >(undefined);
  const [toTokenValue, setToTokenValue] = useState< string | undefined >(undefined);
  const [fromTokenValue, setTokenFromValue] = useState< string | undefined >(undefined);
  const [balance1token, setBalance1token] = useState< number | undefined >(undefined);
  const [balance2token, setBalance2token] = useState< number | undefined >(undefined);
  const [max1token, setMax1token] = useState< number | undefined >(undefined);
  const [max2token, setMax2token] = useState< number | undefined >(undefined);
  const [proportion, setProportion] = useState< string | undefined >(undefined);

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
    if (proportions !== undefined && proportions.proportion !== 'any') {
      setProportion((proportions.proportion));
    } else if (proportions !== undefined && proportions.proportion === 'any') {
      setProportion('любая');
    }
    if (fromTokenLabel && toTokenLabel && proportions) {
      const tokenFromIndex = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel?.value);
      const tokenToIndex = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel?.value);
      const tokenFromBalance = tokens[tokenFromIndex].balance;
      const tokenToBalance = tokens[tokenToIndex].balance;
      if (proportions?.proportion === 'any') {
        setMax2token(tokenToBalance);
        setMax1token(tokenFromBalance);
      } else if (tokenFromBalance && tokenToBalance && tokenFromBalance > tokenToBalance && proportions) {
        console.log('here');
        console.log(tokenFromBalance);
        console.log(tokenToBalance);
        console.log(proportions);
        console.log(proportions.proportion);
        setMax2token(tokenToBalance);
        setMax1token(tokenToBalance * Number(proportions.proportion));
      } else if (tokenFromBalance && tokenToBalance && tokenFromBalance < tokenToBalance && proportions) {
        setMax1token(tokenFromBalance);
        setMax2token(tokenFromBalance / Number(proportions.proportion));
      }
    }
  }, [successSwapForm, proportions, fromTokenLabel, toTokenLabel]);

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
        type: 'add',
      }));
    }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const handleOnChangeFromTokenValue = async (token1:string) => {
    const tokensAreChoosen = fromTokenLabel !== undefined && toTokenLabel !== undefined;
    const inputAreValid = token1.length > 0 && !Number.isNaN(Number(token1));
    if (inputAreValid && tokensAreChoosen) {
      if (proportion !== undefined && proportion !== 'any') {
        const resultToken2 = new BigNumber(token1).div(proportion).toString();
        setToTokenValue(resultToken2);
      }
    }
  };

  const handlerOnChangeToTokenValue = async (token2:string) => {
    const tokensAreChoosen = fromTokenLabel !== undefined && toTokenLabel !== undefined;
    const inputAreValid = token2.length > 0 && !Number.isNaN(Number(token2));
    if (inputAreValid && tokensAreChoosen) {
      if (proportion !== undefined && proportion !== 'any') {
        const resultToken1 = new BigNumber(token2).multipliedBy(proportion).toString();
        setTokenFromValue(resultToken1);
      }
    }
  };

  const handlerOnChangeFromTokenLabel = async (token1:TokenLabel) => {
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

  const formButton = successWallet
    ? <Button type="submit" text="Добавить ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const spinner = (submittingWallet || submittingSwapForm || submittingPairs) && <Spinner />;
  const balance1 = balance1token === undefined ? null : Number(balance1token).toFixed(6);
  const balance2 = balance2token === undefined ? null : Number(balance2token).toFixed(6);
  const prop = proportion === undefined || ''
    ? null
    : `Пропорция:${new BigNumber(proportion).decimalPlaces(6).toString()}`;

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">Добавить ликвидность в пул</h2>
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
                  initialValue={fromTokenValue}
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
                />
                <ErrorForm name="fromTokenLabel" />
                <OnChange name="fromTokenValue">
                  {handleOnChangeFromTokenValue}
                </OnChange>
                <OnChange name="fromTokenLabel">
                  {handlerOnChangeFromTokenLabel}
                </OnChange>
              </div>
              <div className="swap-form__balance">
                Баланс:
                {balance1}
              </div>
              <div className="swap-form__max">
                МАКС:
                {max1token}
              </div>
            </div>
            <div className="swap-form__label-wrapper">
              <label className="swap-form__label">
                <Field
                  name="toTokenValue"
                  component="input"
                  type="text"
                  initialValue={toTokenValue}
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
                <OnChange name="toTokenValue">
                  {handlerOnChangeToTokenValue}
                </OnChange>
              </div>
              <div className="swap-form__balance">
                Баланс:
                {balance2}
              </div>
              <div className="swap-form__max">
                МАКС:
                {max2token}
              </div>
            </div>
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
      <span className="swap-form__proportion">{prop}</span>
    </div>
  );
};

export default AddLiquidForm;