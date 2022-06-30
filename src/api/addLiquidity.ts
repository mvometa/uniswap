/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';

import { ERC20ABI, registryABI, routerABI } from '../constants/abi';
import contracts from '../constants/contractConstants';
import parseUnits from '../utils/parseUnits';
import { tokens } from '../constants/tokenConstants';
import isErrorLike from '../utils/isErrorLike';

const addLiquidity = async (
  token1value:string,
  token2value:string,
  token1adress:string,
  token2adress:string,
  provider: ethers.providers.Web3Provider | undefined,
  signer: ethers.Signer | undefined,
) => {
  try {
    if (provider && signer) {
      const registryContract = new ethers.Contract(
        contracts.registry.address,
        registryABI,
        provider,
      );
      const pairAdress = await registryContract.getPair(token1adress, token2adress);
      const hasPair = !/^0x0+$/.test(pairAdress);
      if (!hasPair) {
        return new Error('Cannot get pair adress');
      }
      const routerContract = new ethers.Contract(
        contracts.router.address,
        routerABI,
        signer,
      );
      const token1Contract = new ethers.Contract(
        token1adress,
        ERC20ABI,
        signer,
      );
      const txToken1 = await token1Contract.approve(contracts.router.address, parseUnits(token1value.toString()));

      const token2Contract = new ethers.Contract(
        token2adress,
        ERC20ABI,
        signer,
      );
      const txToken2 = await token2Contract.approve(contracts.router.address, parseUnits(token2value.toString()));

      await txToken1.wait();
      await txToken2.wait();

      const txRouter = await routerContract.addLiquidity(
        token1adress,
        token2adress,
        parseUnits(token1value),
        parseUnits(token2value),
      );
      await txRouter.wait();
      return undefined;
    }
    return new Error('Provider and signer is not defined');
  } catch (error) {
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return new Error(String(error));
  }
};

export default addLiquidity;
