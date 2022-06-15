type FormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage: number;
};

type FormKey =
  | 'fromTokenValue'
  | 'toTokenValue'
  | 'slippage';

export default FormData;
export type { FormKey };
