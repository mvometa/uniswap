import { takeEvery, put, call } from 'redux-saga/effects';

import {
  setError,
  setSubmitting,
  setSuccess,
  setWalletProvider,
  setWalletSigner,
} from './walletConnectActions';

import {
  SUBMIT_CONNECT_WALLET,
} from './Types';
import connectMetaMask, { EthersProviders } from '../../api/connectMetaMask';

function* workerConnectWalletSaga() {
  yield put(setSubmitting(true));
  const result: Error & EthersProviders = yield call(async () => connectMetaMask());
  // const res = connectMetaMask().then((result) => result).catch((error) => error);
  console.log(result);
  if (result.constructor.name === 'Error') {
    yield put(setError(true));
    yield put(setSuccess(false));
  } else {
    yield put(setSuccess(true));
    yield put(setWalletProvider(result.provider));
    yield put(setWalletSigner(result.signer));
    yield put(setError(false));
  }
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
