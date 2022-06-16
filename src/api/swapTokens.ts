import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import { ERC20ABI } from '../utils/abi';

const swapTokens = (signer:ethers.Signer, tokenAmount:number) => {
  const contract = new ethers.Contract(
    '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168',
    ERC20ABI,
    signer,
  );
  console.log(contract);
  const tx = contract.transfer('0x781F8B032eFd365e56EC96564874937966Fb00e1', parseUnits(`${tokenAmount}`));
  console.log(tx);
  // tx.wait();
};

export default swapTokens;
