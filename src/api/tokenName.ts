import { ethers } from 'ethers';
import { ERC20ABI } from '../utils/abi';

const getNameOfToken = (
  tokenContractAddress:string,
  provider: ethers.providers.Web3Provider,
): Promise<string> => {
  const contract = new ethers.Contract(tokenContractAddress, ERC20ABI, provider);
  const result = contract.name();
  return result;
};

export default getNameOfToken;
