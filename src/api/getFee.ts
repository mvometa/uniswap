import { ethers } from 'ethers';

import {
  feeABI,
} from '../utils/abi';
import contracts from '../utils/contractConstants';

const getFee = async (
  provider: ethers.providers.Provider,
) => {
  try {
    const swapContract = new ethers.Contract(
      contracts.fee.address,
      feeABI,
      provider,
    );
    const feeValue = await swapContract.swapFee();
    const feeDecimals = await swapContract.feeDecimals();
    return {
      feeValue,
      feeDecimals,
    };
  } catch (error) {
    return error;
  }
};

export default getFee;
