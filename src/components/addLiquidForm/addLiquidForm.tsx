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
import parseBigNumber from '../../utils/parseBigNumber';

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
  const [max1token, setMax1token] = useState< string | undefined >(undefined);
  const [max2token, setMax2token] = useState< string | undefined >(undefined);
  const [proportionStateValue, setProportion] = useState< string | undefined >(undefined);

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
    if (proportions !== undefined && proportions.proportion !== 'any' && fromTokenLabel && toTokenLabel) {
      setProportion((proportions.proportion));
    } else if (proportions !== undefined && proportions.proportion === 'any') {
      setProportion('любая');
    }
    if (fromTokenLabel && toTokenLabel && proportions) {
      const tokenFromIndex = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel?.value);
      const tokenToIndex = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel?.value);
      const tokenFromBalance = tokens[tokenFromIndex].balance;
      const tokenToBalance = tokens[tokenToIndex].balance;
      const validDataToSetMax = tokenFromBalance && tokenToBalance && proportions.proportion;
      if (proportions?.proportion === 'any' && validDataToSetMax) {
        setMax2token(new BigNumber(tokenToBalance).decimalPlaces(5).toString());
        setMax1token(new BigNumber(tokenFromBalance).decimalPlaces(5).toString());
      } else if (
        validDataToSetMax
        && tokenFromBalance > tokenToBalance
        && proportions.proportion !== '1'
        && proportions.proportion
      ) {
        setMax2token(new BigNumber(tokenToBalance).decimalPlaces(5).toString());
        setMax1token(
          new BigNumber(tokenToBalance)
            .multipliedBy(proportions.proportion)
            .decimalPlaces(5)
            .toString(),
        );
      } else if (validDataToSetMax && tokenFromBalance < tokenToBalance && proportions.proportion !== '1') {
        setMax1token(new BigNumber(tokenFromBalance).toFixed(6));
        setMax2token(new BigNumber(tokenFromBalance / Number(proportions.proportion)).toFixed(6));
      } else if (validDataToSetMax && proportions.proportion === '1') {
        const max = Math.min(tokenFromBalance, tokenToBalance);
        setMax1token(new BigNumber(max).decimalPlaces(5).toString());
        setMax2token(new BigNumber(max).decimalPlaces(5).toString());
      }
    }
  }, [successSwapForm, proportions, fromTokenLabel, toTokenLabel]);

  const handleFormSubmit = (data:SwapFormData) => {
    const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === data.fromTokenLabel.value);
    const tokenTo = tokens.find((elem:TokenInfo) => elem.name === data.toTokenLabel.value);
    if (tokenFrom && tokenTo && fromTokenValue && toTokenValue) {
      dispatch(submitSwapForm({
        fromTokenIndex: tokenFrom,
        toTokenIndex: tokenTo,
        toTokenValue,
        fromTokenValue,
        provider,
        signer,
        type: 'add',
      }));
    }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const handleOnChangeFromTokenValue = (token1:string) => {
    const tokensAreChoosen = fromTokenLabel !== undefined && toTokenLabel !== undefined;
    const inputAreValid = token1.length > 0 && !Number.isNaN(Number(token1));
    if (inputAreValid && tokensAreChoosen) {
      setTokenFromValue(token1);
      if (proportions?.proportion !== undefined && proportions.proportion !== 'any') {
        const resultToken2 = new BigNumber(token1).div(proportions.proportion).toString();
        setToTokenValue(resultToken2);
      }
    }
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

  const formButton = successWallet
    ? <Button type="submit" text={submittingSwapForm ? 'Идет транзакция' : 'Добавить ликвидность'} />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const spinner = (submittingWallet || submittingSwapForm || submittingPairs) && <Spinner />;
  const balance1 = balance1token === undefined ? null : new BigNumber(balance1token).decimalPlaces(5).toString();
  const balance2 = balance2token === undefined ? null : new BigNumber(balance2token).decimalPlaces(5).toString();
  const prop = proportionStateValue === undefined || ''
    ? null
    : `Пропорция:${new BigNumber(proportionStateValue).decimalPlaces(5).toString()}`;

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
                  initialValue={parseBigNumber(fromTokenValue)}
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
                  initialValue={parseBigNumber(toTokenValue)}
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
              <div className="swap-form__max">
                МАКС:
                {max2token}
              </div>
            </div>
            <span
              className="swap-form__error"
              style={(errorWallet || errorSwapForm) ? { display: 'block' } : { display: 'none' }}
            >
              Ошибка.
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
