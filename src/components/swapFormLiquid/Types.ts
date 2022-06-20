type FormData = {
  fromTokenValue: number;
  toTokenValue: number;
};

type FormKey =
  | 'fromTokenValue'
  | 'toTokenValue';

export type SwapFormSelectType = {
  value: string;
  label: string;
};

export type SwapFormData = {
  fromTokenValue: number;
  toTokenValue: number;
  toTokenLabel: SwapFormSelectType;
  fromTokenLabel: SwapFormSelectType;
};

export type SwapFormLiquidProps = {
  header: string;
  type: 'add' | 'delete';
};

export default FormData;
export type { FormKey };
