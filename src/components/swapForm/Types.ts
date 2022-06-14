type FormData = {
  fromToken: number;
  toToken: number;
  slippage: number;
};

type FormKey =
  | 'fromToken'
  | 'toToken'
  | 'slippage';

export default FormData;
export type { FormKey };
