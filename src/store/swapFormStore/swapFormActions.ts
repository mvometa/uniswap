import { AnyAction } from 'redux';

import {
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
} from './Types';

const setSwapFormSubmitting = (payload: boolean): AnyAction => ({
  type: SET_SWAP_FORM_SUBMITTING,
  payload,
});

const setSwapFormError = (payload: boolean): AnyAction => ({
  type: SET_SWAP_FORM_ERROR,
  payload,
});

export {
  setSwapFormSubmitting,
  setSwapFormError,
};
