/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
import { concat, formatUnits } from 'ethers/lib/utils';
import { TokenInfo } from '../store/walletStore/Types';
import { ERC20ABI, registryABI, routerABI } from '../utils/abi';
import BigNumber from '../utils/bigNumberConfig';
import contracts from '../utils/contractConstants';
import parseUnits from '../utils/parseUnits';
import { tokens } from '../utils/tokenConstants';

const getProportion = async (
  token1adress:string,
  token2adress:string,
  provider: ethers.providers.Web3Provider | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
):Promise< BigNumber | undefined | 'any'> => {
  if (provider && signer) {
    const registryContract = new ethers.Contract(
      contracts.registry.address,
      registryABI,
      provider,
    );
    const pairAdress = await registryContract.getPair(token1adress, token2adress);
    const hasPair = !/^0x0+$/.test(pairAdress);
    if (!hasPair) {
      return undefined;
    }
    const token1Contract = new ethers.Contract(
      token1adress,
      ERC20ABI,
      provider,
    );
    const token1Balance = await token1Contract.balanceOf(pairAdress);

    const token2Contract = new ethers.Contract(
      token2adress,
      ERC20ABI,
      provider,
    );
    const token2Balance = await token2Contract.balanceOf(pairAdress);

    const isProportionUndefined = token1Balance === undefined
    || token2Balance === undefined
    || token1Balance.isZero()
    || token2Balance.isZero();

    if (isProportionUndefined) {
      return 'any';
    }

    const formattedBalanceOfToken0 = formatUnits(token1Balance);
    const formattedBalanceOfToken1 = formatUnits(token2Balance);
    const proportion = new BigNumber(formattedBalanceOfToken0)
      .div(formattedBalanceOfToken1);
    return proportion;
  }
  return undefined;
};

export default getProportion;
