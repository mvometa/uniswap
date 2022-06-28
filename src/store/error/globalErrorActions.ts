import { AnyAction } from 'redux';

import {
  GlobalErrorState,
  SET_GLOBAL_ERROR,
  SET_GLOBAL_ERROR_DISPATCH,
} from './Types';

const setGlobalError = (payload: string): AnyAction => ({
  type: SET_GLOBAL_ERROR,
  payload,
});

const setGlobalErrorDispatch = (payload: GlobalErrorState): AnyAction => ({
  type: SET_GLOBAL_ERROR_DISPATCH,
  payload,
});

export {
  setGlobalError,
  setGlobalErrorDispatch,
};
