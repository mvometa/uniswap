/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import addLiquidity from '../../api/addLiquidity';
import swapTokens from '../../api/swapTokens';
import { submitConnectWalletForm } from '../walletStore/walletConnectActions';

import { setSwapFormError, setSwapFormSubmitting, setSwapFormSuccess } from './swapFormActions';
import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data: SagaSwapFormType) {
  const { payload } = data;
  const {
    fromTokenValue,
    toTokenValue,
    fromTokenIndex,
    toTokenIndex,
    provider,
    signer,
  } = payload;
  if (payload.type === 'add') {
    if (!fromTokenIndex.adress || !toTokenIndex.adress) {
      yield put(submitConnectWalletForm(true));
    }
    yield put(setSwapFormSuccess(false));
    yield put(setSwapFormSubmitting(true));
    let result;
    yield call(result = async () => addLiquidity(
      fromTokenValue,
      toTokenValue,
      fromTokenIndex?.adress,
      toTokenIndex?.adress,
      provider,
      signer,
    ));
    if (result?.constructor.name === 'Error') {
      yield put(setSwapFormError(true));
      yield put(setSwapFormSuccess(false));
    } else {
      yield put(setSwapFormSuccess(true));
      yield put(setSwapFormError(false));
    }
    yield put(setSwapFormSubmitting(false));
  } else if (payload.type === 'get') {
    console.log('get');
  } else {
    yield put(setSwapFormSubmitting(true));
    if (payload.provider && payload.signer) {
      yield call(async () => swapTokens(
        payload.fromTokenIndex?.adress,
        payload.toTokenIndex?.adress,
        payload.signer,
        payload.provider,
        String(payload.fromTokenValue),
        String(payload.toTokenValue),
      ));
    }
    yield put(setSwapFormSubmitting(false));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchSwapFormSaga() {
  yield takeEvery(SUBMIT_SWAP_FORM, workerSwapFormSaga);
}

export default watchSwapFormSaga;
