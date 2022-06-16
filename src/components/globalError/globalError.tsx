import GlobalErrorProps from './types';
import './globalError.scss';

const GlobalError = (props: GlobalErrorProps) => {
  const { message } = props;
  return <div className="global-error">{message}</div>;
};

export default GlobalError;
