import { Field } from 'react-final-form';

import { ErrorProps } from './types';

import './errorForm.scss';

export const requiredNotEmpty = (value:string | number) => {
  if (value === undefined) return 'Пожалуйста заполните поле';
  return '';
};

export const ErrorForm = ({ name }:ErrorProps) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) => (touched && error ? <span className="error-form">{error}</span> : null)}
  />
);
