import { BigNumber, ethers } from 'ethers';

const getBalanceInNumberFormat = (balance:BigNumber) => ethers.utils.formatEther(balance);

export default getBalanceInNumberFormat;
