/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { OnChange } from 'react-final-form-listeners';

import { RootState } from '../../store/store';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';
import BigNumber from '../../utils/bigNumberConfig';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
import parseUnits from '../../utils/parseUnits';
import getPairData from '../../api/getPairData';

import Button from '../button/button';
import Spinner from '../spinner/spinner';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';

import './swapFormLiquid.scss';
import validate from './validate';
import { SwapFormData, SwapFormLiquidProps } from './Types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapFormLiquid = (props: SwapFormLiquidProps): React.ReactElement => {
  const { header } = props;
  const dispatch = useDispatch();
  const [fromTokenLabel, setToken1Label] = useState<TokenLabel | undefined>(undefined);
  const [toTokenLabel, setToken2Label] = useState<TokenLabel | undefined>(undefined);
  const [toTokenValue, setToTokenValue] = useState<string | undefined>(undefined);
  const [balance1token, setBalance1token] = useState<number | undefined>(undefined);
  const [balance2token, setBalance2token] = useState<number | undefined>(undefined);
  const [balance1Max, setBalance1Max] = useState<number | undefined>(undefined);
  const [balance2Max, setBalance2Max] = useState<number | undefined>(undefined);
  const [proportion, setProportion] = useState< string | undefined>('');

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
  } = { ...useSelector((state:RootState) => state.SwapFormReducer) };

  const handleFormSubmit = (data:SwapFormData) => {
    console.log(data);
    const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === data.fromTokenLabel.value);
    const tokenTo = tokens.find((elem:TokenInfo) => elem.name === data.toTokenLabel.value);
    // if (tokenFrom && tokenTo) {
    //   dispatch(submitSwapForm({
    //     toTokenIndex: tokenTo,
    //     fromTokenIndex: tokenFrom,
    //     toTokenValue: data.toTokenValue,
    //     fromTokenValue: data.fromTokenValue,
    //     provider,
    //     signer,
    //     type: 'add',
    //   }));
    // }
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const handleOnChangeFromTokenValue = async (value:string) => {
    console.log('inside');
    // const tokensAreChoosen = fromTokenLabel !== undefined && toTokenLabel !== undefined;
    // const inputAreValid = value.length > 0 && !Number.isNaN(Number(value));
    // if (inputAreValid && tokensAreChoosen) {
    //   const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel.value);
    //   const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel.value);
    //   const fromTokenValueBigNumber = parseUnits(value);
    //   const pair = await getPairData(
    //     tokens[tokenFrom].adress,
    //     tokens[tokenTo].adress,
    //     adressWallet,
    //     provider,
    //     signer,
    //   );
    //   if (pair.proportion !== undefined && pair.proportion !== 'any') {
    //     const resultToken2 = fromTokenValueBigNumber.div(parseUnits(pair.proportion.toString()));
    //     setToTokenValue(ethers.utils.formatEther(resultToken2));
    //     setProportion((new BigNumber(pair.proportion)).decimalPlaces(6).toString());
    //     console.log(pair);
    //   } else if (pair.proportion === 'any') {
    //     setToTokenValue(tokens[tokenTo].balance?.toString());
    //   }
    // }
  };

  const handlerOnChangeFromTokenLabel = async (token1:TokenLabel) => {
    if (token1) {
      const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === token1.value);
      setBalance1token(tokens[tokenFrom].balance);
      setToken1Label(token1);
      if (toTokenLabel && token1.value !== toTokenLabel.value) {
        const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel.value);
        const pair = await getPairData(
          tokens[tokenFrom].adress,
          tokens[tokenTo].adress,
          adressWallet,
          provider,
          signer,
        );
        if (pair.proportion !== undefined && pair.proportion !== 'any') {
          setProportion((new BigNumber(pair.proportion)).decimalPlaces(6).toString());
        } else if (pair.proportion === 'any') {
          setProportion('любая');
        }
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
        const pair = await getPairData(
          tokens[tokenFrom].adress,
          tokens[tokenTo].adress,
          adressWallet,
          provider,
          signer,
        );
        if (pair.proportion !== undefined && pair.proportion !== 'any') {
          setProportion((new BigNumber(pair.proportion)).decimalPlaces(6).toString());
        } else if (pair.proportion === 'any') {
          setProportion('любая');
        }
      }
    }
  };

  const formButton = successWallet
    ? <Button type="submit" text="Добавить ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const spinner = (submittingWallet || submittingSwapForm) && <Spinner />;
  const balance1 = balance1token === undefined ? null : Number(balance1token).toFixed(6);
  const balance2 = balance2token === undefined ? null : Number(balance2token).toFixed(6);
  const prop = proportion === undefined ? null : `Пропорция:${proportion}`;

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">{header}</h2>
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
              </div>
              <div className="swap-form__balance">
                Баланс:
                {balance2}
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

export default SwapFormLiquid;
