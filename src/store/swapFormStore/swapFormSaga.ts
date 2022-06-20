/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';
import swapTokens from '../../api/swapTokens';
import { tokens } from '../../utils/tokenConstants';
import { setSwapFormSubmitting } from './swapFormActions';

import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data: SagaSwapFormType) {
  const { payload } = data;
  yield put(setSwapFormSubmitting(true));
  yield call(() => delay(3000));
  if (payload.provider && payload.signer) {
    yield call(async () => swapTokens(
      tokens[payload.fromTokenIndex],
      tokens[payload.toTokenIndex],
      payload.signer,
      payload.provider,
      String(payload.fromTokenValue),
      String(payload.toTokenValue),
    ));
  }
  yield put(setSwapFormSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchSwapFormSaga() {
  yield takeEvery(SUBMIT_SWAP_FORM, workerSwapFormSaga);
}

export default watchSwapFormSaga;
