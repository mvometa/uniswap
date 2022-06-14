import React from 'react';
import { Field, FieldMetaState, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button';
import { submitConnectWalletForm } from '../../store/walletStore/walletConnectActions';

import downArrow from './down-arrow.svg';
import './swapForm.scss';
import validate from './validate';
import { RootState } from '../../store/store';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const SwapForm = ():React.ReactElement => {
  const dispatch = useDispatch();

  const {
    success,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const handleFormSubmit = async () => {
  };

  const handleConnectWallet = async () => {
    dispatch(submitConnectWalletForm(true));
  };

  const formButton = success
    ? <Button type="submit" text="Поменять пару" />
    : <Button type="button" text="Подключить кошелек" onPointerDown={handleConnectWallet} />;

  const validationBlock = (meta: FieldMetaState<number>) => (
    meta.error
    && meta.touched
    && <span className="swap-form__error">{meta.error}</span>
  );

  return (
    <div className="swap-form">
      <h2 className="swap-form__header">Обменять</h2>
      <Form onSubmit={handleFormSubmit} validate={validate}>
        {({ handleSubmit }) => (
          <form className="swap-form__form" onSubmit={handleSubmit}>
            <Field name="fromToken">
              {({ input, meta }) => (
                <label className="swap-form__label">
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
            <div className="swap-form__arrow">
              <img className="swap-form__arrow-down" src={downArrow} alt="arrow down" />
            </div>
            <Field name="toToken">
              {({ input, meta }) => (
                <label className="swap-form__label">
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
            <Field name="slippage">
              {({ input, meta }) => (
                <label className="swap-form__label">
                  Введите проскальзывание в %:
                  <input
                    className="swap-form__input"
                    {...input}
                    type="text"
                    defaultValue={0.10}
                    placeholder="0.10"
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
