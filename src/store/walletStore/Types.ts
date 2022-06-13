import { ethers } from 'ethers';

const SET_CONNECT_WALLET_SUBMITTING = 'SET_CONNECT_WALLET_SUBMITTING';
const SUBMIT_CONNECT_WALLET = 'SUBMIT_CONNECT_WALLET';
const SET_CONNECT_WALLET_ERROR = 'SET_CONNECT_WALLET_ERROR';
const SET_CONNECT_WALLET_SUCCESS = 'SET_CONNECT_WALLET_SUCCESS';
const SET_WALLET_BALANCE = 'SET_WALLET_BALANCE';
const SET_WALLET_PROVIDER = 'SET_WALLET_PROVIDER';
const SET_WALLET_SIGNER = 'SET_WALLET_SIGNER';

type WalletConnectionState = {
  submitting: boolean;
  error: boolean;
  success:boolean;
  balance: string;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

export default WalletConnectionState;
export {
  SET_CONNECT_WALLET_ERROR,
  SET_CONNECT_WALLET_SUCCESS,
  SUBMIT_CONNECT_WALLET,
  SET_CONNECT_WALLET_SUBMITTING,
  SET_WALLET_BALANCE,
  SET_WALLET_PROVIDER,
  SET_WALLET_SIGNER,
};
