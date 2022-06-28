import {
  takeEvery,
  put,
} from 'redux-saga/effects';

import {
  setGlobalError,
} from './globalErrorActions';
import { GlobalErrorSagaType, SET_GLOBAL_ERROR_DISPATCH } from './Types';

function* workerGlobalErrorSaga(data: GlobalErrorSagaType) {
  const { payload } = data;
  const { globalErrorMessage } = payload;
  yield put(setGlobalError(globalErrorMessage));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchGlobalErrorSaga() {
  yield takeEvery(SET_GLOBAL_ERROR_DISPATCH, workerGlobalErrorSaga);
}

export default watchGlobalErrorSaga;
