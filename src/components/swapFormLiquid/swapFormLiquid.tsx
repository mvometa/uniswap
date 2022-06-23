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

import Button from '../button/button';
import Spinner from '../spinner/spinner';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';

import './swapFormLiquid.scss';
import validate from './validate';
import { SwapFormData, SwapFormLiquidProps } from './Types';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
import getProportion from '../../api/getProportion';
import parseUnits from '../../utils/parseUnits';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapFormLiquid = (props: SwapFormLiquidProps): React.ReactElement => {
  const { header } = props;
  const dispatch = useDispatch();
  const [fromTokenLabel, setFromTokenLabel] = useState<TokenLabel | undefined>(undefined);
  const [toTokenLabel, setToTokenLabel] = useState<TokenLabel | undefined>(undefined);
  const [toTokenValue, setToTokenValue] = useState<string | undefined>(undefined);

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
    console.log(data);
    const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === data.fromTokenLabel.value);
    const tokenTo = tokens.find((elem:TokenInfo) => elem.name === data.toTokenLabel.value);
    if (tokenFrom && tokenTo) {
      dispatch(submitSwapForm({
        toTokenIndex: tokenTo,
        fromTokenIndex: tokenFrom,
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

  const handlerOnChangeFromTokenValue = async (value:string) => {
    const tokensAreChoosen = fromTokenLabel !== undefined && toTokenLabel !== undefined;
    const inputAreValid = value.length > 0 && !Number.isNaN(Number(value));
    if (inputAreValid && tokensAreChoosen) {
      const tokenFrom = tokens.findIndex((elem:TokenInfo) => elem.name === fromTokenLabel.value);
      const tokenTo = tokens.findIndex((elem:TokenInfo) => elem.name === toTokenLabel.value);
      const fromTokenValueBigNumber = parseUnits(value);
      const proportion = await getProportion(
        tokens[tokenFrom].adress,
        tokens[tokenTo].adress,
        provider,
        signer,
      );
      if (proportion !== undefined && proportion !== 'any') {
        const resultToken2 = fromTokenValueBigNumber.div(proportion.toString());
        setToTokenValue(ethers.utils.formatEther(resultToken2));
      } else if (proportion === 'any') {
        setToTokenValue(tokens[tokenTo].balance?.toString());
      }
    }
  };

  const handlerOnChangeFromTokenLabel = (value:TokenLabel) => {
    setFromTokenLabel(value);
  };

  const handlerOnChangeToTokenLabel = (value:TokenLabel) => {
    setToTokenLabel(value);
  };

  const formButton = successWallet
    ? <Button type="submit" text="Добавить ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const handleSelectChangeTokenFrom = (item:TokenLabel) => {
    if (item) {
      const index = tokens.findIndex((elem:TokenInfo) => elem.name === item.value);
    }
  };

  const spinner = (submittingWallet || submittingSwapForm) && <Spinner />;

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
                  onSelectCallback={handleSelectChangeTokenFrom}
                />
                <ErrorForm name="fromTokenLabel" />
                <OnChange name="fromTokenValue">
                  {handlerOnChangeFromTokenValue}
                </OnChange>
                <OnChange name="fromTokenLabel">
                  {handlerOnChangeFromTokenLabel}
                </OnChange>
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
    </div>
  );
};

export default SwapFormLiquid;
