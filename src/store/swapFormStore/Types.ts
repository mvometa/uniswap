const SUBMIT_SWAP_FORM = 'SUBMIT_SWAP_FORM';
const SET_SWAP_FORM_ERROR = 'SET_SWAP_FORM_ERROR';
const SET_SWAP_FORM_SUBMITTING = 'SET_SWAP_FORM_SUBMITTING';

type SwapFormState = {
  submitting: boolean;
  error: boolean;
};

type SwapFormSelectType = {
  value: string;
  label: string;
};

export type SagaSwapFormType = {
  type: string;
  payload:SwapFormData;
};

export type SwapFormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage: number;
  toTokenLabel: SwapFormSelectType;
  fromTokenLabel: SwapFormSelectType;
};

export default SwapFormState;
export {
  SUBMIT_SWAP_FORM,
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
};
