type FormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage?: number;
};

type FormKey =
  | 'fromTokenValue'
  | 'toTokenValue'
  | 'slippage';

export type SwapFormSelectType = {
  value: string;
  label: string;
};

export type SwapFormData = {
  fromTokenValue: string;
  toTokenValue: string;
  slippage: string;
  toTokenLabel: SwapFormSelectType;
  fromTokenLabel: SwapFormSelectType;
};

export default FormData;
export type { FormKey };
