import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';

import RootSaga from './RootSaga';
import SwapFormReducer from './swapFormStore/swapFormReducer';
import WalletConnectReducer from './walletStore/walletConnectReducer';

const sagaMiddleware = createSagaMiddleware();

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const rootReducer = combineReducers({
  WalletConnectReducer,
  SwapFormReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    sagaMiddleware,
  ],
});
(store as SagaStore).sagaTask = sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
