import { takeEvery, put, call } from 'redux-saga/effects';
import { ethers } from 'ethers';

import {
  setSubmitting,
} from './walletConnectActions';

import {
  SUBMIT_CONNECT_WALLET,
} from './Types';

function* workerConnectWalletSaga() {
  console.log('inside saga');
  yield put(setSubmitting(true));
  if (typeof window.ethereum !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    yield call(() => provider.send('eth_requestAccounts', []));
    const balance = provider.getBalance('0xA2be0e1dFC02ce398e1Cf0D7c94fE058586F5CF0');
    console.log(balance);
    // console.log(getBalanceInNumberFormat(balance));
    // setWalletBalance(getBalanceInNumberFormat(balance));
  } else {
    // eslint-disable-next-line no-alert
    window.alert('Установите Metamask');
  }
  yield call(() => console.log('call saga'));
  yield put(setSubmitting(false));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchConnectWalletSaga() {
  yield takeEvery(SUBMIT_CONNECT_WALLET, workerConnectWalletSaga);
}

export default watchConnectWalletSaga;
