import { takeEvery, put } from 'redux-saga/effects';

import {
  setError,
  setSubmitting,
  setSuccess,
} from './walletConnectActions';

import {
  SUBMIT_CONNECT_WALLET,
} from './Types';
import connectMetaMask from '../../api/connectMetaMask';

function* workerConnectWalletSaga() {
  yield put(setSubmitting(true));
  const res = connectMetaMask().then((result) => result).catch((error) => error);
  console.log(res);
  if (res.constructor.name === 'Error') {
    yield put(setError(true));
    yield put(setSuccess(false));
  } else {
    yield put(setSuccess(true));
    yield put(setError(false));
  }
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
