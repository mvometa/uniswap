import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import swapTokens from '../../api/swapTokens';

import { setSwapFormSubmitting } from './swapFormActions';
import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data: SagaSwapFormType) {
  const { payload } = data;
  if (payload.type === 'add') {
    console.log('add');
  } else if (payload.type === 'delete') {
    console.log('delete');
  } else {
    yield put(setSwapFormSubmitting(true));
    yield call(() => delay(3000));
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
