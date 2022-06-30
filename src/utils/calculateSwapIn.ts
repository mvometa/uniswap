import { formatUnits } from 'ethers/lib/utils';

import BigNumber from '../constants/bigNumberConfig';

type Options = {
  amountIn: string | undefined;
  balanceIn: string | undefined;
  balanceOut: string | undefined;
  fee: {
    feeValue: BigNumber | undefined;
    feeDecimals: string;
  };
};

const calculateSwapIn = ({
  amountIn,
  balanceIn,
  balanceOut,
  fee,
}: Options) => {
  if (balanceIn && new BigNumber(balanceIn).lte(0)) {
    return '0';
  }
  if (
    balanceIn === undefined
    || balanceOut === undefined
    || fee === undefined
    || fee.feeDecimals === undefined
    || fee.feeValue === undefined
    || amountIn === undefined) {
    return undefined;
  }
  const tenBigNumber = new BigNumber(10);
  const amountInBigNumber = new BigNumber(amountIn.toString());
  const balanceInBigNumber = new BigNumber(balanceIn.toString());
  const balanceOutBigNumber = new BigNumber(balanceOut.toString());

  const multiplier = tenBigNumber.pow(fee.feeDecimals);
  const amountInWithFee = amountInBigNumber.times(
    multiplier.minus(fee.feeValue.toString()),
  );

  const amountOut = balanceOutBigNumber
    .times(amountInWithFee)
    .div(balanceInBigNumber.times(multiplier).plus(amountInWithFee))
    .toFixed(0);

  return formatUnits(amountOut.toString());
};

export default calculateSwapIn;
