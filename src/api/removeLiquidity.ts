import { ethers } from 'ethers';

import { routerABI } from '../constants/abi';
import contracts from '../constants/contractConstants';
import parseUnits from '../utils/parseUnits';

const removeLiquidity = async (token1: string, token2: string, amountLP:string, signer:ethers.Signer) => {
  const routerContract = new ethers.Contract(
    contracts.router.address,
    routerABI,
    signer,
  );
  const txRouter = await routerContract.removeLiquidity(token1, token2, parseUnits(amountLP));
  await txRouter.removeLiquidity.wait();
  return undefined;
};

export default removeLiquidity;
