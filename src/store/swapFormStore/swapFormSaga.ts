import { call, takeEvery } from 'redux-saga/effects';
import { SagaSwapFormType, SUBMIT_SWAP_FORM } from './Types';

function* workerSwapFormSaga(data:SagaSwapFormType) {
  yield call(() => console.log(data));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchSwapFormSaga() {
  yield takeEvery(SUBMIT_SWAP_FORM, workerSwapFormSaga);
}

export default watchSwapFormSaga;
