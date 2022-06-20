type FormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage: number;
};

type FormKey =
  | 'fromTokenValue'
  | 'toTokenValue'
  | 'slippage';

type SwapFormSelectType = {
  value: string;
  label: string;
};

export type SwapFormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage: number;
  toTokenLabel: SwapFormSelectType;
  fromTokenLabel: SwapFormSelectType;
};

export default FormData;
export type { FormKey };
