import { ethers } from 'ethers';

import {
  feeABI,
} from '../utils/abi';
import contracts from '../utils/contractConstants';
import isErrorLike from '../utils/isErrorLike';

const getFee = async (
  provider: ethers.providers.Provider,
) => {
  try {
    const swapContract = new ethers.Contract(
      contracts.fee.address,
      feeABI,
      provider,
    );
    const fee = await swapContract.swapFee();
    const feeDecimals = await swapContract.feeDecimals();
    return {
      fee,
      feeDecimals,
    };
  } catch (error) {
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return error;
  }
  return undefined;
};

export default getFee;
