import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

import './globalError.scss';

const GlobalError = () => {
  const {
    message,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };
  return <div className="global-error">{message}</div>;
};

export default GlobalError;
