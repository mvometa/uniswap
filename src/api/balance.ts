import { BigNumber, ethers } from 'ethers';

import { ERC20ABI } from '../utils/abi';

const getBalance = async (wallet: string, provider: ethers.providers.Web3Provider):Promise<string> => {
  const balance = await provider.getBalance(wallet);
  const result = ethers.utils.formatEther(balance);
  return result;
};

export const getBalanceOfToken = (
  tokenContractAddress:string,
  provider: ethers.providers.Web3Provider,
  signer: ethers.Signer,
): Promise<number> => {
  const contract = new ethers.Contract(tokenContractAddress, ERC20ABI, provider);
  const result = contract.balanceOf(signer?.getAddress())
    .then((res:BigNumber) => ethers.utils.formatEther(res));
  return result;
};

export default getBalance;
