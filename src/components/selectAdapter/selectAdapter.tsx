import { FieldRenderProps } from 'react-final-form';
import Select from 'react-select';

import './selectAdapter.scss';
import { OptionsValue, SelectCallback } from './types';

const SelectAdapter = (
  { input, onSelectCallback, ...rest }:FieldRenderProps<string, HTMLElement> & OptionsValue & SelectCallback,
) => {
  if (onSelectCallback) {
    onSelectCallback(input.value);
  }

  return (
    <Select
      {...input}
      {...rest}
      classNamePrefix="react-select"
      placeholder="Выберите токен"
    />
  );
};

export default SelectAdapter;
