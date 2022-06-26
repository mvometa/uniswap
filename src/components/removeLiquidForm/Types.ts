type FormData = {
  fromTokenValue: number;
  toTokenValue: number;
};

type FormKey = 'balanceToRemove';

export type SwapFormSelectType = {
  value: string;
  label: string;
};

export type SwapFormData = {
  balanceToRemove: number;
  token1Label: SwapFormSelectType;
  token2Label: SwapFormSelectType;
};

export default FormData;
export type { FormKey };
