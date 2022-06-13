import { takeEvery, put, call } from 'redux-saga/effects';

import {
  setSubmitting,
} from './walletConnectActions';

import {
  SUBMIT_CONNECT_WALLET_FORM,
} from './Types';

function* workerConnectWalletSaga() {
  yield put(setSubmitting(true));
  yield call(() => console.log('call saga'));
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET_FORM, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
