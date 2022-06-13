import { AnyAction } from 'redux';

import {
  SET_CONNECT_WALLET_ERROR,
  SET_CONNECT_WALLET_SUCCESS,
  SUBMIT_CONNECT_WALLET,
  SET_CONNECT_WALLET_SUBMITTING,
  SET_WALLET_BALANCE,
} from './Types';

const setSubmitting = (payload: boolean): AnyAction => ({
  type: SET_CONNECT_WALLET_SUBMITTING,
  payload,
});

const submitConnectWalletForm = (payload: boolean): AnyAction => ({
  type: SUBMIT_CONNECT_WALLET,
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

const setWalletBalance = (payload: string): AnyAction => ({
  type: SET_WALLET_BALANCE,
  payload,
});

export {
  setSubmitting,
  submitConnectWalletForm,
  setError,
  setSuccess,
  setWalletBalance,
};
