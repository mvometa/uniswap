import { FormKey, RemoveLiquidFormData } from './Types';

const validate = (values: RemoveLiquidFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const REQUIRED_FIELDS: FormKey[] = [
    'balanceToRemove',
  ];

  const tokenLabelsHasChoosen = values.token1Label && values.token2Label;
  if (tokenLabelsHasChoosen && values.token1Label.value === values.token2Label.value) {
    errors.token1Label = 'Токены совпадают';
    errors.token2Label = 'Токены совпадают';
  }

  if (values.balanceToRemove && Number.isNaN(Number(values.balanceToRemove))) {
    errors.balanceToRemove = 'Пожалуйста введите числовое значение';
  }

  REQUIRED_FIELDS.forEach((field) => {
    if (values[field] === undefined) {
      errors[field] = 'Пожалуйста заполните поле';
    }
  });

  return errors;
};

export default validate;
