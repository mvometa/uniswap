import { Circles } from 'react-loader-spinner';

import './spinner.scss';
import { SpinnerProps } from './types';

const Spinner = (props: SpinnerProps) => {
  const { width = 80, height = 80, color = '#00BFFF' } = props;
  return (
    <div className="spinner">
      <Circles color={color} height={height} width={width} />
    </div>
  );
};

export default Spinner;
