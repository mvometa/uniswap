import { ethers } from 'ethers';

import { routerABI } from '../constants/abi';
import contracts from '../constants/contractConstants';
import isErrorLike from '../utils/isErrorLike';
import parseUnits from '../utils/parseUnits';

const removeLiquidity = async (
  token1adress: string,
  token2adress: string,
  amountLP:string | undefined,
  signer:ethers.Signer | undefined,
) => {
  try {
    if (signer === undefined) {
      return new Error('Signer is undefined');
    }
    const routerContract = new ethers.Contract(
      contracts.router.address,
      routerABI,
      signer,
    );
    if (amountLP !== undefined) {
      const txRouter = await routerContract.removeLiquidity(
        token1adress,
        token2adress,
        parseUnits(amountLP),
      );
      await txRouter.wait();
      return undefined;
    }
    return new Error('Balance to remove is undefined');
  } catch (error) {
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return new Error(String(error));
  }
};

export default removeLiquidity;
