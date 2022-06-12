import React from 'react';
import { ethers } from 'ethers';
import { Field, FieldMetaState, Form } from 'react-final-form';

import Button from '../button/button';

import downArrow from './down-arrow.svg';
import './swapForm.scss';
import FormData from './Types';
import validate from './validate';
import getBalance from '../../utils/balance';

declare global {
  interface Window {
    ethereum: any;
  }
}

const SwapForm = ():React.ReactElement => {
  const handleFormSubmit = async (data:FormData) => {
    console.log(data);
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const balance = await provider.getBalance('0xA2be0e1dFC02ce398e1Cf0D7c94fE058586F5CF0');
      console.log(balance);
      console.log(getBalance(balance));
    } else {
      window.alert('Установите Metamask');
    }
  };

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
            <span
              className="swap-form__error"
              style={false ? { display: 'block' } : { display: 'none' }}
            >
              Error.
            </span>
            <Button type="submit" text="Подключить кошелек" />
          </form>
        )}
      </Form>
    </div>
  );
};

export default SwapForm;
