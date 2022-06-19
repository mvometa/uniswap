import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { setSwapFormSubmitting } from './swapFormActions';

import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data: SagaSwapFormType) {
  yield put(setSwapFormSubmitting(true));
  yield call(() => console.log(data.payload));
  yield put(delay(3000));
  yield put(setSwapFormSubmitting(false));
  // swapTokens(tokens[1], tokens[0], result.signer, result.provider, '3.03');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchSwapFormSaga() {
  yield takeEvery(SUBMIT_SWAP_FORM, workerSwapFormSaga);
}

export default watchSwapFormSaga;
