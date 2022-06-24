/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { ERC20ABI, registryABI } from '../utils/abi';
import BigNumber from '../utils/bigNumberConfig';
import contracts from '../utils/contractConstants';

type Proportion = {
  proportion: string | undefined | 'any';
  token1Balance:string;
  token2Balance:string;
};

const getProportion = async (
  token1adress:string,
  token2adress:string,
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
      };
    }
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
        proportion: 'any',
        token1Balance,
        token2Balance,
      };
    }

    const formattedBalanceOfToken1 = formatUnits(token1Balance, 78);
    const formattedBalanceOfToken2 = formatUnits(token2Balance, 78);
    console.log('tokrnbalance');
    console.log(token1Balance.toString());
    console.log(token2Balance.toString());
    console.log('formsttedbalance');
    console.log(formattedBalanceOfToken1.toString());
    console.log(formattedBalanceOfToken2.toString());
    const proportion = new BigNumber(formattedBalanceOfToken1)
      .div(formattedBalanceOfToken2).toString();
    console.log(proportion);
    return {
      proportion,
      token1Balance,
      token2Balance,
    };
  }
  return {
    proportion: undefined,
    token1Balance: '',
    token2Balance: '',
  };
};

export default getProportion;
