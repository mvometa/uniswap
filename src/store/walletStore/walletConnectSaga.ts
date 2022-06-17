import { takeEvery, put, call } from 'redux-saga/effects';

import {
  setError,
  setErrorMessage,
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
// import { swapToken2 } from '../../api/swapTokens';
import removeLiquidity from '../../api/removeLiquidity';

function* workerConnectWalletSaga() {
  yield put(setSubmitting(true));
  const result: Error & EthersProviders = yield call(async () => connectMetaMask());
  if (result.constructor.name === 'Error') {
    yield put(setError(true));
    yield put(setSuccess(false));
    yield put(setErrorMessage(result.message));
  } else {
    yield put(setSuccess(true));
    yield put(setWalletProvider(result.provider));
    yield put(setWalletSigner(result.signer));
    yield put(setError(false));
    yield put(setErrorMessage(''));
    const adress: string = yield call(async () => result.signer.getAddress());
    const temp:Array<TokenLabel> = [];
    tokens.forEach(async (tokenAdress) => {
      const tokenName = await getNameOfToken(tokenAdress, result.provider);
      temp.push({ value: tokenName, label: tokenName });
    });
    // swapToken2(tokens[0], tokens[1], result.signer, result.provider, '0.2');
    removeLiquidity(tokens[0], tokens[1], '2', result.signer);
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
