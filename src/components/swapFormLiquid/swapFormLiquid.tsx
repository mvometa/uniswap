import React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './swapFormLiquid.scss';
import validate from './validate';

import Button from '../button/button';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';
import { RootState } from '../../store/store';
import SelectAdapter from '../selectAdapter/selectAdapter';
import { ErrorForm, requiredNotEmpty } from '../errorForm/errorForm';
import { SwapFormData } from './Types';
import { TokenInfo, TokenLabel } from '../../store/walletStore/Types';

import Spinner from '../spinner/spinner';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapFormLiquid = ():React.ReactElement => {
  const dispatch = useDispatch();

  const {
    successWallet,
    tokenLabels,
    submittingWallet,
    errorWallet,
    tokens,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const {
    submittingSwapForm,
    errorSwapForm,
  } = { ...useSelector((state:RootState) => state.SwapFormReducer) };

  const handleFormSubmit = (data:SwapFormData) => {
    console.log(data);
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const formButton = successWallet
    ? <Button type="submit" text="Добавить ликвидность" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const handleSelectChangeTokenFrom = (item:TokenLabel) => {
    if (item) {
      const index = tokens.findIndex((elem:TokenInfo) => elem.name === item.value);
      console.log(index);
    }
  };

  const spinner = (submittingWallet || submittingSwapForm) && <Spinner />;

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">Добавить ликвидность</h2>
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
              </div>
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
