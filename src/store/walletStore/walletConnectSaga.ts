import { takeEvery, put, call } from 'redux-saga/effects';

import {
  setError,
  setErrorMessage,
  setSubmitting,
  setSuccess,
  setTokenLabels,
  setTokens,
  setWalletAdress,
  setWalletProvider,
  setWalletSigner,
} from './walletConnectActions';
import {
  SUBMIT_CONNECT_WALLET, TokenInfo, TokenLabel,
} from './Types';

import connectMetaMask, { EthersProviders } from '../../api/connectMetaMask';
import { tokens } from '../../utils/tokenConstants';
import getTokenName from '../../api/getTokenName';
import { getBalanceOfToken } from '../../api/getBalance';
import getFee from '../../api/getFee';
import getMax from '../../api/getMax';

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
    getMax('', '', result.provider, result.signer);
    const adress: string = yield call(async () => result.signer.getAddress());
    const temp: Array <TokenInfo> = [];
    const tempLabels:Array<TokenLabel> = [];
    const tempBalances:Array<number> = [];
    yield call(async () => tokens.forEach(async (tokenAdress, index) => {
      const tokenName = await getTokenName(tokenAdress, result.provider);
      const tokenBalance = await getBalanceOfToken(tokens[index], result.provider, result.signer);
      tempLabels.push({ value: tokenName, label: tokenName });
      if (tokenBalance !== undefined) {
        tempBalances.push(tokenBalance);
      }
      temp.push({
        adress: tokenAdress,
        balance: tokenBalance,
        name: tokenName,
      });
    }));
    yield call(async () => getFee(result.provider));
    yield put(setTokenLabels(tempLabels));
    yield put(setWalletAdress(adress));
    yield put(setTokens(temp));
  }
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
