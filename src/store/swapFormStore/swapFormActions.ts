import { AnyAction } from 'redux';

import {
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
  SUBMIT_SWAP_FORM,
  SwapFormData,
} from './Types';

const setSwapFormSubmitting = (payload: boolean): AnyAction => ({
  type: SET_SWAP_FORM_SUBMITTING,
  payload,
});

const submitSwapForm = (payload: SwapFormData): AnyAction => ({
  type: SUBMIT_SWAP_FORM,
  payload,
});

const setSwapFormError = (payload: boolean): AnyAction => ({
  type: SET_SWAP_FORM_ERROR,
  payload,
});

export {
  setSwapFormSubmitting,
  setSwapFormError,
  submitSwapForm,
};
