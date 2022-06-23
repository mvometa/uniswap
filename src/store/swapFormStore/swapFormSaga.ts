import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import addLiquidity from '../../api/addLiquidity';

import swapTokens from '../../api/swapTokens';

import { setSwapFormSubmitting } from './swapFormActions';
import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data: SagaSwapFormType) {
  const { payload } = data;
  if (payload.type === 'add') {
    yield put(setSwapFormSubmitting(true));
    yield call(async () => addLiquidity(
      payload.fromTokenValue,
      payload.toTokenValue,
      payload.fromTokenIndex?.adress,
      payload.toTokenIndex?.adress,
      payload.provider,
      payload.signer,
    ));
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
