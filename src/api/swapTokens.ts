import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { CONTRACT_ABI_ERC20 } from '../utils/tokenConstants';

const swapTokens = (signer:ethers.Signer, tokenAmount:number) => {
  const contract = new ethers.Contract(
    '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168',
    CONTRACT_ABI_ERC20,
    signer,
  );
  console.log(contract);
  const tx = contract.transfer('0x781F8B032eFd365e56EC96564874937966Fb00e1', parseUnits(`${tokenAmount}`));
  console.log(tx);
  // tx.wait();
};

export default swapTokens;
