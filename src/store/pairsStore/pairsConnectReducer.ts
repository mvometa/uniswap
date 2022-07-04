import { AnyAction } from 'redux';
import PairsConnectionState, {
  SET_PROPORTIONS_SUBMITTING,
  SET_WALLET_PROPORTIONS,
  SUBMIT_PROPORTIONS,
} from './Types';

const initialState: PairsConnectionState = {
  proportion: undefined,
  submittingPairs: false,
  errorPairs: false,
  successPairs: false,
};

const PairsConnectReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: PairsConnectionState = initialState,
  action: AnyAction,
): PairsConnectionState => {
  switch (action.type) {
    case SET_PROPORTIONS_SUBMITTING:
      return {
        ...state,
        submittingPairs: action.payload,
      };
    case SUBMIT_PROPORTIONS:
      return {
        ...state,
        proportion: action.payload,
      };
    case SET_WALLET_PROPORTIONS:
      return {
        ...state,
        proportion: action.payload,
      };
    default:
      return state;
  }
};

export default PairsConnectReducer;
