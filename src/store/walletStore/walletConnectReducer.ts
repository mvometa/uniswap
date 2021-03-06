import { AnyAction } from 'redux';

import WalletConnectionState, {
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
  SET_WALLET_FEE,
} from './Types';

const initialState: WalletConnectionState = {
  submittingWallet: false,
  message: '',
  errorWallet: false,
  successWallet: false,
  balanceWallet: '',
  provider: undefined,
  signer: undefined,
  adressWallet: '',
  tokenLabels: [],
  tokenBalances: [],
  tokens: [],
  fee: undefined,
};

const WalletConnectReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: WalletConnectionState = initialState,
  action: AnyAction,
): WalletConnectionState => {
  switch (action.type) {
    case SET_CONNECT_WALLET_ERROR:
      return {
        ...state,
        errorWallet: action.payload,
      };
    case SET_WALLET_FEE:
      return {
        ...state,
        fee: action.payload,
      };
    case SET_WALLET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_WALLET_ADRESS:
      return {
        ...state,
        adressWallet: action.payload,
      };
    case SET_WALLET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
      };
    case SET_WALLET_TOKEN_LABELS:
      return {
        ...state,
        tokenLabels: action.payload,
      };
    case SET_WALLET_PROVIDER:
      return {
        ...state,
        provider: action.payload,
      };
    case SET_WALLET_SIGNER:
      return {
        ...state,
        signer: action.payload,
      };
    case SET_WALLET_BALANCE:
      return {
        ...state,
        balanceWallet: action.payload,
      };
    case SET_CONNECT_WALLET_SUBMITTING:
      return {
        ...state,
        submittingWallet: action.payload,
      };
    case SET_CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        successWallet: action.payload,
      };
    case SUBMIT_CONNECT_WALLET:
      return {
        ...state,
        submittingWallet: action.payload,
      };
    default:
      return state;
  }
};

export default WalletConnectReducer;
