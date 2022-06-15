import { BigNumber, ethers } from 'ethers';
import { CONTRACT_ABI_ERC20 } from '../utils/tokenConstants';

const getBalance = async (wallet: string, provider: ethers.providers.Web3Provider):Promise<string> => {
  const balance = await provider.getBalance(wallet);
  const result = ethers.utils.formatEther(balance);
  return result;
};

export const getBalanceOfToken = (
  tokenContractAddress:string,
  provider: ethers.providers.Web3Provider,
  signer: ethers.providers.JsonRpcSigner,
): Promise<number> => {
  const contract = new ethers.Contract(tokenContractAddress, CONTRACT_ABI_ERC20, provider);
  const result = contract.balanceOf(signer?.getAddress())
    .then((res:BigNumber) => ethers.utils.formatEther(res));
  return result;
};

export default getBalance;
