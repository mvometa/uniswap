import { utils } from 'ethers';

import BigNumber from '../constants/bigNumberConfig';

import parseUnits from './parseUnits';

const { formatUnits } = utils;

type Options = {
  amountOut: string;
  slippage: string;
  decimals: number;
};

const calculateMinOut = ({ amountOut, slippage, decimals = 18 }: Options) => {
  const tokenOutValueBigNumber = new BigNumber(
    parseUnits(amountOut, decimals).toString(),
  );
  const slippageFormatted = slippage === '' ? '0' : slippage;
  const slippageBigNumber = tokenOutValueBigNumber.times(slippageFormatted).div(100);

  const tokenMinOut = tokenOutValueBigNumber
    .minus(slippageBigNumber)
    .toFixed(0);

  return formatUnits(tokenMinOut, decimals);
};

export default calculateMinOut;
