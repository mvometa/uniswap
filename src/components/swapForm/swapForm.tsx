import React from 'react';
import { Field, FieldMetaState, Form } from 'react-final-form';

import Button from '../button/button';

import downArrow from './down-arrow.svg';
import './swapForm.scss';
import FormData from './Types';
import validate from './validate';

const SwapForm = ():React.ReactElement => {
  const handleFormSubmit = (data:FormData) => {
    console.log(data);
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
