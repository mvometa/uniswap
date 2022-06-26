import { ethers } from 'ethers';

import { routerABI } from '../constants/abi';
import contracts from '../constants/contractConstants';
import parseUnits from '../utils/parseUnits';

const removeLiquidity = async (
  token1adress: string,
  token2adress: string,
  amountLP:string | undefined,
  signer:ethers.Signer | undefined,
) => {
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
};

export default removeLiquidity;
