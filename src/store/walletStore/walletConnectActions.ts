import { ethers } from 'ethers';
import { AnyAction } from 'redux';

import {
  SET_CONNECT_WALLET_ERROR,
  SET_CONNECT_WALLET_SUCCESS,
  SUBMIT_CONNECT_WALLET,
  SET_CONNECT_WALLET_SUBMITTING,
  SET_WALLET_BALANCE,
  SET_WALLET_PROVIDER,
  SET_WALLET_SIGNER,
  SET_WALLET_ADRESS,
} from './Types';

const setSubmitting = (payload: boolean): AnyAction => ({
  type: SET_CONNECT_WALLET_SUBMITTING,
  payload,
});

const setWalletAdress = (payload: string): AnyAction => ({
  type: SET_WALLET_ADRESS,
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

const setWalletProvider = (payload: ethers.providers.Web3Provider): AnyAction => ({
  type: SET_WALLET_PROVIDER,
  payload,
});

const setWalletSigner = (payload: ethers.providers.JsonRpcSigner): AnyAction => ({
  type: SET_WALLET_SIGNER,
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
  setWalletProvider,
  setWalletSigner,
  setWalletAdress,
};
