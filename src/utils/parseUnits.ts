import { ethers } from 'ethers';

import BigNumber from '../constants/bigNumberConfig';

const parseUnits = (number: string, decimals = 18) => ethers.utils.parseUnits(
  new BigNumber(number).toFixed(decimals).toString(),
  decimals,
);

export default parseUnits;
