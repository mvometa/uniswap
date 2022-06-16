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
} from './Types';

const initialState: WalletConnectionState = {
  submitting: false,
  message: '',
  error: false,
  success: false,
  balance: '',
  provider: undefined,
  signer: undefined,
  adress: 0,
  tokenLabels: [],
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
        error: action.payload,
      };
    case SET_WALLET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_WALLET_ADRESS:
      return {
        ...state,
        adress: action.payload,
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
        balance: action.payload,
      };
    case SET_CONNECT_WALLET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload,
      };
    case SET_CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case SUBMIT_CONNECT_WALLET:
      return {
        ...state,
        submitting: action.payload,
      };
    default:
      return state;
  }
};

export default WalletConnectReducer;
