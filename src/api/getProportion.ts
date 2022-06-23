/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
import { concat } from 'ethers/lib/utils';
import { TokenInfo } from '../store/walletStore/Types';
import { ERC20ABI, registryABI, routerABI } from '../utils/abi';
import BigNumber from '../utils/bigNumberConfig';
import contracts from '../utils/contractConstants';
import parseUnits from '../utils/parseUnits';
import { tokens } from '../utils/tokenConstants';

const getProportion = async (
  token1:TokenInfo,
  token2:TokenInfo,
  provider: ethers.providers.Web3Provider | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
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
    const token1Contract = new ethers.Contract(
      token1.adress,
      ERC20ABI,
      provider,
    );
    const token1Balance = await token1Contract.balanceOf(pairAdress);
    const token2Contract = new ethers.Contract(
      token2.adress,
      ERC20ABI,
      provider,
    );
    const token2Balance = await token2Contract.balanceOf(pairAdress);
    const formattedBalanceOfToken0 = ethers.utils.formatUnits(token1Balance, 78);
    const formattedBalanceOfToken1 = ethers.utils.formatUnits(token2Balance, 78);
    const proportion = new BigNumber(formattedBalanceOfToken0)
      .div(formattedBalanceOfToken1);
    return proportion;
  }
  return undefined;
};

export default getProportion;
