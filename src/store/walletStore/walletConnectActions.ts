import { AnyAction } from 'redux';

import {
  SET_CONNECT_WALLET_ERROR,
  SET_CONNECT_WALLET_SUCCESS,
  SUBMIT_CONNECT_WALLET_FORM,
  SET_CONNECT_WALLET_SUBMITTING,
} from './Types';

const setSubmitting = (payload: boolean): AnyAction => ({
  type: SET_CONNECT_WALLET_SUBMITTING,
  payload,
});

const submitConnectWalletForm = (payload: void): AnyAction => ({
  type: SUBMIT_CONNECT_WALLET_FORM,
  payload,
});

const setError = (payload: boolean): AnyAction => ({
  type: SET_CONNECT_WALLET_ERROR,
  payload,
});

const setSuccess = (payload: boolean): AnyAction => ({
  type: SET_CONNECT_WALLET_SUCCESS,
  payload,
});

export {
  setSubmitting,
  submitConnectWalletForm,
  setError,
  setSuccess,
};
