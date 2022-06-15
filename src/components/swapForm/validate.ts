import FormData, { FormKey } from './Types';

const validate = (values: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const REQUIRED_FIELDS: FormKey[] = [
    'fromToken',
    'toToken',
    'slippage',
  ];

  if (values.slippage && values.slippage > 50) {
    errors.slippage = 'Проскальзывание не может быть больше 50%';
  }

  REQUIRED_FIELDS.forEach((field) => {
    if (values[field] === undefined) {
      errors[field] = 'Пожалуйста заполните поле';
    }
  });

  return errors;
};

export const userRoles = [
  { value: 'manager', label: 'Manager' },
  { value: 'client', label: 'Client' },
];

export default validate;
