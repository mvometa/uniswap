import { ethers } from 'ethers';

const getBalance = (balance) => ethers.utils.formatEther(balance);

export default getBalance;
