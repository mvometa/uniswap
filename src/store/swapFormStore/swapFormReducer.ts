import { AnyAction } from 'redux';

import SwapFormState, {
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
} from './Types';

const initialState: SwapFormState = {
  submittingSwapForm: false,
  errorSwapForm: false,
};

const SwapFormReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: SwapFormState = initialState,
  action: AnyAction,
): SwapFormState => {
  switch (action.type) {
    case SET_SWAP_FORM_ERROR:
      return {
        ...state,
        errorSwapForm: action.payload,
      };
    case SET_SWAP_FORM_SUBMITTING:
      return {
        ...state,
        submittingSwapForm: action.payload,
      };
    default:
      return state;
  }
};

export default SwapFormReducer;
