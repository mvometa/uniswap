import { ethers } from 'ethers';

import { ERC20ABI } from '../constants/abi';

const getTokenName = async (
  tokenContractAddress:string,
  provider: ethers.providers.Web3Provider,
): Promise< string > => {
  const contract = new ethers.Contract(tokenContractAddress, ERC20ABI, provider);
  const result = await contract.name();
  return result;
};

export default getTokenName;
