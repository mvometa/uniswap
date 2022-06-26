import { FieldRenderProps } from 'react-final-form';
import Select from 'react-select';

import './selectAdapter.scss';
import { OptionsValue, SelectCallback } from './types';

const SelectAdapter = (
  {
    input,
    onSelectCallback,
    onReset, ...rest
  }:FieldRenderProps<string, HTMLElement> & OptionsValue & SelectCallback,
) => {
  if (onSelectCallback) {
    onSelectCallback(input.value);
  }
  let def;
  if (onReset) {
    def = '';
  }

  return (
    <Select
      {...input}
      {...rest}
      defaultValue={def}
      classNamePrefix="react-select"
      placeholder="Выберите токен"
    />
  );
};

export default SelectAdapter;
