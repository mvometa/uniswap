/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';

import { registryABI, routerABI } from '../utils/abi';
import contracts from '../utils/contractConstants';
import parseUnits from '../utils/parseUnits';
import { tokens } from '../utils/tokenConstants';

const addLiquidity = async (
  token1value:number,
  token2value:number,
  token1:string,
  token2:string,
  provider: ethers.providers.Web3Provider | undefined,
  signer: ethers.Signer | undefined,
) => {
  if (provider && signer) {
    const registryContract = new ethers.Contract(
      contracts.registry.address,
      registryABI,
      provider,
    );
    const pairAdress = await registryContract.getPair(tokens[0], tokens[1]);
    const hasPair = !/^0x0+$/.test(pairAdress);
    if (!hasPair) {
      return new Error('Cannot get pair adress');
    }
    const routerContract = new ethers.Contract(
      contracts.router.address,
      routerABI,
      signer,
    );
    const txRouter = await routerContract.addLiquidity(
      token1,
      token2,
      parseUnits(token1value.toString()),
      parseUnits(token2value.toString()),
    );
    await txRouter.wait();
    return undefined;
  }
  return undefined;
};

export default addLiquidity;
