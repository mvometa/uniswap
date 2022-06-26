import { FormKey, SwapFormData } from './Types';

const validate = (values: SwapFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const REQUIRED_FIELDS: FormKey[] = [
    'fromTokenValue',
    'toTokenValue',
  ];

  const tokenLabelsHasChoosen = values.fromTokenLabel && values.toTokenLabel;
  if (tokenLabelsHasChoosen && values.fromTokenLabel.value === values.toTokenLabel.value) {
    errors.fromTokenLabel = 'Токены совпадают';
    errors.toTokenLabel = 'Токены совпадают';
  }

  if (values.fromTokenValue && Number.isNaN(Number(values.fromTokenValue))) {
    errors.fromTokenValue = 'Пожалуйста введите числовое значение';
  }

  if (values.toTokenValue && Number.isNaN(Number(values.toTokenValue))) {
    errors.toTokenValue = 'Пожалуйста введите числовое значение';
  }

  REQUIRED_FIELDS.forEach((field) => {
    if (values[field] === undefined) {
      errors[field] = 'Пожалуйста заполните поле';
    }
  });

  return errors;
};

export default validate;
