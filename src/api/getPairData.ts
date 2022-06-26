/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

import { ERC20ABI, registryABI } from '../constants/abi';
import BigNumber from '../constants/bigNumberConfig';
import contracts from '../constants/contractConstants';

type Proportion = {
  proportion: string | undefined | 'any';
  token1Balance:string;
  token2Balance:string;
  pairAdress: string;
  userBalance: string;
};

const getProportion = async (
  token1adress:string,
  token2adress:string,
  userWalletAdress: string,
  provider: ethers.providers.Web3Provider | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
):Promise< Proportion > => {
  if (provider && signer) {
    const registryContract = new ethers.Contract(
      contracts.registry.address,
      registryABI,
      provider,
    );
    const pairAdress = await registryContract.getPair(token1adress, token2adress);
    const hasPair = !/^0x0+$/.test(pairAdress);
    if (!hasPair) {
      return {
        proportion: undefined,
        token1Balance: '',
        token2Balance: '',
        pairAdress: '',
        userBalance: '',
      };
    }
    const tokenPairContract = new ethers.Contract(
      pairAdress,
      ERC20ABI,
      provider,
    );
    const tokenPairBalance = await tokenPairContract.balanceOf(userWalletAdress);
    const tokenPairDecimals = await tokenPairContract.decimals();
    const token1Contract = new ethers.Contract(
      token1adress,
      ERC20ABI,
      provider,
    );
    const token1Balance = await token1Contract.balanceOf(pairAdress);
    const token2Contract = new ethers.Contract(
      token2adress,
      ERC20ABI,
      provider,
    );
    const token2Balance = await token2Contract.balanceOf(pairAdress);

    const isProportionUndefined = token1Balance === undefined
    || token2Balance === undefined
    || token1Balance.isZero()
    || token2Balance.isZero();

    if (isProportionUndefined) {
      return {
        pairAdress,
        proportion: 'any',
        token1Balance,
        token2Balance,
        userBalance: '',
      };
    }

    const formattedBalanceOfToken1 = formatUnits(token1Balance);
    const formattedBalanceOfToken2 = formatUnits(token2Balance);
    const proportion = new BigNumber(formattedBalanceOfToken1)
      .div(formattedBalanceOfToken2).toString();
    return {
      proportion,
      token1Balance: formattedBalanceOfToken1,
      token2Balance: formattedBalanceOfToken2,
      pairAdress,
      userBalance: formatUnits(tokenPairBalance, tokenPairDecimals),
    };
  }
  return {
    proportion: undefined,
    token1Balance: '',
    token2Balance: '',
    pairAdress: '',
    userBalance: '',
  };
};

export default getProportion;
