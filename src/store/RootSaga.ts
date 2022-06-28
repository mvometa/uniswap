import {
  all, call, CallEffect, spawn,
} from '@redux-saga/core/effects';
import { Saga } from '@redux-saga/types';
import watchGlobalErrorSaga from './error/globalErrorSaga';
import watchPairsConnectSaga from './pairsStore/pairsConnectSaga';
import watchSwapFormSaga from './swapFormStore/swapFormSaga';

import watchConnectWalletSaga from './walletStore/walletConnectSaga';

function* startSaga(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saga: Saga<any>,
): Generator<CallEffect<unknown>, void, unknown> {
  while (true) {
    try {
      yield call(saga);
      break;
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* RootSaga(): Generator<any, any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sagas: Saga<any>[] = [
    watchConnectWalletSaga,
    watchSwapFormSaga,
    watchPairsConnectSaga,
    watchGlobalErrorSaga,
  ];

  const retrySagas = yield sagas.map((saga) => spawn(startSaga, saga));

  yield all(retrySagas);
}

export default RootSaga;
