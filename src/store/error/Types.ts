const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
const SET_GLOBAL_ERROR_DISPATCH = 'SET_GLOBAL_ERROR_DISPATCH';

export type GlobalErrorState = {
  globalErrorMessage: string;
};

export type GlobalErrorSagaType = {
  type: string;
  payload: GlobalErrorState;
};

export default GlobalErrorSagaType;
export {
  SET_GLOBAL_ERROR,
  SET_GLOBAL_ERROR_DISPATCH,
};
