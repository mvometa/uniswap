import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import {
  ERC20ABI,
  registryABI,
  routerABI,
} from '../utils/abi';
import contracts from '../utils/contractConstants';
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

    const txTokenIn = await tokenFromContract.approve(contracts.router.address, parseUnits(tokenAmountFrom));
    await txTokenIn.wait();

    const routerContract = new ethers.Contract(
      contracts.router.address,
      routerABI,
      signer,
    );

    const txRouter = await routerContract.swapIn(tokenFromAdress, tokenToAdress, parseUnits(
      tokenAmountFrom,
    ), parseUnits(tokenAmountTo));

    await txRouter.wait();
  } catch (error) {
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return error;
  }

  return undefined;
};

export default swapTokens;
