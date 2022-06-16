import { AnyAction } from 'redux';

import SwapFormState, {
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
} from './Types';

const initialState: SwapFormState = {
  submitting: false,
  error: false,
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
        error: action.payload,
      };
    case SET_SWAP_FORM_SUBMITTING:
      return {
        ...state,
        submitting: action.payload,
      };
    default:
      return state;
  }
};

export default SwapFormReducer;
