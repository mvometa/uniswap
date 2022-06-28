import { AnyAction } from 'redux';
import {
  GlobalErrorState,
  SET_GLOBAL_ERROR,
} from './Types';

const initialState: GlobalErrorState = {
  globalErrorMessage: '',
};

const GlobalErrorReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: GlobalErrorState = initialState,
  action: AnyAction,
): GlobalErrorState => {
  switch (action.type) {
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        globalErrorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default GlobalErrorReducer;
