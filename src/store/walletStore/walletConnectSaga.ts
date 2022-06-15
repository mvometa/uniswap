import { takeEvery, put, call } from 'redux-saga/effects';

import {
  setError,
  setSubmitting,
  setSuccess,
  setTokenLabels,
  setWalletAdress,
  setWalletProvider,
  setWalletSigner,
} from './walletConnectActions';
import {
  SUBMIT_CONNECT_WALLET, TokenLabel,
} from './Types';

import connectMetaMask, { EthersProviders } from '../../api/connectMetaMask';
import { tokens } from '../../utils/tokenConstants';
import getNameOfToken from '../../api/tokenName';

function* workerConnectWalletSaga() {
  yield put(setSubmitting(true));
  const result: Error & EthersProviders = yield call(async () => connectMetaMask());
  if (result.constructor.name === 'Error') {
    yield put(setError(true));
    yield put(setSuccess(false));
  } else {
    yield put(setSuccess(true));
    yield put(setWalletProvider(result.provider));
    yield put(setWalletSigner(result.signer));
    yield put(setError(false));
    const adress: string = yield call(async () => result.signer.getAddress());
    const temp:Array<TokenLabel> = [];
    console.log(`adress= ${adress}`);
    tokens.forEach(async (tokenAdress) => {
      const tokenName = await getNameOfToken(tokenAdress, result.provider);
      temp.push({ value: tokenName, label: tokenName });
    });
    yield put(setTokenLabels(temp));
    yield put(setWalletAdress(adress));
  }
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
