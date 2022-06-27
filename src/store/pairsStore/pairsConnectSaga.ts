import {
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';
import getPairData, { ProportionType } from '../../api/getPairData';

import {
  setProportions,
  setSubmittingProportions,
} from './pairsConnectActions';
import { ProportionSagaType, SUBMIT_PROPORTIONS } from './Types';

function* workerPairsConnectSaga(data: ProportionSagaType) {
  console.log('inside saga');
  const { payload } = data;
  const {
    token1adress,
    token2adress,
    provider,
    signer,
    userWalletAdress,
  } = payload;
  yield put(setSubmittingProportions(true));
  const pair: ProportionType = yield call(async () => getPairData(
    token1adress,
    token2adress,
    userWalletAdress,
    provider,
    signer,
  ));
  console.log(pair);
  yield put(setSubmittingProportions(false));
  yield put(setProportions(pair));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchPairsConnectSaga() {
  yield takeEvery(SUBMIT_PROPORTIONS, workerPairsConnectSaga);
}

export default watchPairsConnectSaga;
