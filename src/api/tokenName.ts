import { ethers } from 'ethers';
import { CONTRACT_ABI_ERC20 } from '../utils/tokenConstants';

const getNameOfToken = (
  tokenContractAddress:string,
  provider: ethers.providers.Web3Provider,
): Promise<string> => {
  const contract = new ethers.Contract(tokenContractAddress, CONTRACT_ABI_ERC20, provider);
  const result = contract.name();
  return result;
};

export default getNameOfToken;
