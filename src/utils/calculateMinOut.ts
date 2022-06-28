import { formatUnits } from 'ethers/lib/utils';

import BigNumber from '../constants/bigNumberConfig';

import parseUnits from './parseUnits';

type Options = {
  amountOut: string;
  slippage: number;
  decimals: number;
};

const calculateMinOut = ({ amountOut, slippage, decimals }: Options) => {
  const tokenOutValueBigNumber = new BigNumber(
    parseUnits(amountOut, decimals).toString(),
  );
  const slippageBigNumber = tokenOutValueBigNumber.times(slippage).div(100);

  const tokenMinOut = tokenOutValueBigNumber
    .minus(slippageBigNumber)
    .toFixed(0);

  return formatUnits(tokenMinOut, decimals);
};

export default calculateMinOut;
