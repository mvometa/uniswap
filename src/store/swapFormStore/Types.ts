const SUBMIT_SWAP_FORM = 'SUBMIT_SWAP_FORM';
const SET_SWAP_FORM_ERROR = 'SET_SWAP_FORM_ERROR';
const SET_SWAP_FORM_SUBMITTING = 'SET_SWAP_FORM_SUBMITTING';

type SwapFormState = {
  submitting: boolean;
  error: boolean;
};

export default SwapFormState;
export {
  SUBMIT_SWAP_FORM,
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
};
