/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Field, FieldMetaState, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import downArrow from './down-arrow.svg';
import './swapForm.scss';
import validate from './validate';

import Button from '../button/button';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { RootState } from '../../store/store';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';
import { SwapFormData } from '../../store/swapFormStore/Types';
import { submitSwapForm } from '../../store/swapFormStore/swapFormActions';
import { TokenLabel } from '../../store/walletStore/Types';
import { getBalanceOfToken } from '../../api/getBalance';
import { tokens } from '../../utils/tokenConstants';
import Spinner from '../spinner/spinner';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapForm = ():React.ReactElement => {
  const dispatch = useDispatch();
  const [max, setMax] = useState(0);

  const {
    successWallet,
    tokenLabels,
    provider,
    signer,
    submittingWallet,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const handleFormSubmit = (data:SwapFormData) => {
    dispatch(submitSwapForm(data));
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

  const handleSelectChangeFrom = async (item:TokenLabel) => {
    if (item) {
      const index = tokenLabels.findIndex((elem:any) => elem.value === item.value);
      const balance = await getBalanceOfToken(tokens[index], provider, signer);
      if (balance) {
        setMax(balance);
      }
    }
  };

  const handleMaxClick = () => {
    console.log('max clicked');
  };

  const spinner = submittingWallet && <Spinner />;

  const maxButton = successWallet && (
    <button
      className="swap-form__max-button"
      onClick={handleMaxClick}
      onKeyDown={handleMaxClick}
      type="button"
    >
      <span className="max-value">
        {`Максимум: ${max}`}
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
                {maxButton}
              </label>
              <div className="select-wrapper select-wrapper_first">
                <Field
                  name="fromTokenLabel"
                  component={SelectAdapter}
                  options={tokenLabels}
                  validate={requiredNotEmpty}
                  onSelectCallback={handleSelectChangeFrom}
                />
                <ErrorForm name="fromTokenLabel" />
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
              style={false ? { display: 'block' } : { display: 'none' }}
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
