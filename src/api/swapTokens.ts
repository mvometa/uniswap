import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import {
  ERC20ABI,
  registryABI,
  routerABI,
} from '../constants/abi';
import contracts from '../constants/contractConstants';
import isErrorLike from '../utils/isErrorLike';

const swapTokens = async (
  tokenFromAdress: string,
  tokenToAdress: string,
  signer: ethers.Signer | undefined,
  provider: ethers.providers.Provider | undefined,
  tokenAmountFrom:string,
  tokenAmountTo: string,
) => {
  try {
    const registryContract = new ethers.Contract(
      contracts.registry.address,
      registryABI,
      provider,
    );

    const pairAddress = await registryContract.getPair(tokenFromAdress, tokenToAdress);

    if (pairAddress === undefined) {
      return new Error('registryContract.getPair result is undefined');
    }

    const tokenFromContract = new ethers.Contract(
      tokenFromAdress,
      ERC20ABI,
      signer,
    );

    const txTokenFrom = await tokenFromContract.approve(contracts.router.address, parseUnits(tokenAmountFrom));
    await txTokenFrom.wait();

    const routerContract = new ethers.Contract(
      contracts.router.address,
      routerABI,
      signer,
    );
    console.log(routerContract);
    const txRouter = await routerContract.swapIn(tokenFromAdress, tokenToAdress, parseUnits(
      tokenAmountFrom,
    ), parseUnits(tokenAmountTo));
    console.log(txRouter);
    await txRouter.wait();
  } catch (error) {
    console.log('catch error');
    console.log(error);
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return new Error(String(error));
  }

  return undefined;
};

export default swapTokens;
