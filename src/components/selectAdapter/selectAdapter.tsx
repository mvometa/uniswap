import { FieldRenderProps } from 'react-final-form';
import Select from 'react-select';

import './selectAdapter.scss';
import { OptionsValue } from './types';

const SelectAdapter = (
  { input, ...rest }:FieldRenderProps<string, HTMLElement> & OptionsValue,
) => <Select {...input} {...rest} classNamePrefix="react-select" placeholder="Выберите токен" />;

export default SelectAdapter;
