import { ethers } from 'ethers';

const SET_CONNECT_WALLET_SUBMITTING = 'SET_CONNECT_WALLET_SUBMITTING';
const SUBMIT_CONNECT_WALLET = 'SUBMIT_CONNECT_WALLET';
const SET_CONNECT_WALLET_ERROR = 'SET_CONNECT_WALLET_ERROR';
const SET_CONNECT_WALLET_SUCCESS = 'SET_CONNECT_WALLET_SUCCESS';
const SET_WALLET_BALANCE = 'SET_WALLET_BALANCE';
const SET_WALLET_PROVIDER = 'SET_WALLET_PROVIDER';
const SET_WALLET_SIGNER = 'SET_WALLET_SIGNER';
const SET_WALLET_ADRESS = 'SET_WALLET_ADRESS';
const SET_WALLET_TOKEN_LABELS = 'SET_WALLET_TOKEN_LABELS';
const SET_WALLET_ERROR_MESSAGE = 'SET_WALLET_ERROR_MESSAGE';
const SET_WALLET_TOKENS = 'SET_WALLET_TOKENS';

type WalletConnectionState = {
  submittingWallet: boolean;
  errorWallet: boolean;
  successWallet:boolean;
  balanceWallet: string;
  adressWallet: number;
  message: string;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  tokenLabels: Array<TokenLabel> [];
  tokenBalances: Array<number> [];
  tokens:Array<TokenInfo>;
};

export type TokenInfo = {
  balance: number | undefined;
  name: string;
  adress: string;
};

export type TokenLabel = {
  value: string;
  label: string;
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
  SET_WALLET_ADRESS,
  SET_WALLET_TOKEN_LABELS,
  SET_WALLET_ERROR_MESSAGE,
  SET_WALLET_TOKENS,
};
