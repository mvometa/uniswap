import { AnyAction } from 'redux';

import WalletConnectionState, {
  SET_CONNECT_WALLET_ERROR,
  SET_CONNECT_WALLET_SUCCESS,
  SUBMIT_CONNECT_WALLET_FORM,
  SET_CONNECT_WALLET_SUBMITTING,
} from './Types';

const initialState: WalletConnectionState = {
  submitting: false,
  error: false,
  success: false,
  connected: false,
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
    case SUBMIT_CONNECT_WALLET_FORM:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default WalletConnectReducer;
