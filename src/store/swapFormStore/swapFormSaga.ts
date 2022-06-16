import { call, takeEvery } from 'redux-saga/effects';
import { SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga() {
  yield call(() => console.log('inside'));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchSwapFormSaga() {
  yield takeEvery(SUBMIT_SWAP_FORM, workerSwapFormSaga);
}

export default watchSwapFormSaga;
