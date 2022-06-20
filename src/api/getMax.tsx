import { ethers } from 'ethers';

import { ERC20ABI } from '../utils/abi';
import contracts from '../utils/contractConstants';

const getMax = async (
  tokenFromAdress: string,
  tokenToAdress: string,
  provider: ethers.providers.Provider,
  signer: ethers.Signer,
) => {
  const registry = new ethers.Contract(
    contracts.registry.address,
    contracts.registry.ABI,
    provider,
  );
  const pair = await registry.getPair(
    '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168',
    '0x781F8B032eFd365e56EC96564874937966Fb00e1',
  );
  const tokenContract = new ethers.Contract(
    '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168',
    ERC20ABI,
    signer,
  );

  let pairBalance = await tokenContract.balanceOf(pair);
  pairBalance = ethers.utils.formatEther(pairBalance);
  let tokenBalance = await tokenContract.balanceOf(signer.getAddress());
  tokenBalance = ethers.utils.formatEther(tokenBalance);
  const result = Math.min(pairBalance, tokenBalance);
  return result;
};

export default getMax;
