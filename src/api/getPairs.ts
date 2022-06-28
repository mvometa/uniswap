import { ethers } from 'ethers';
import makePairs from '../utils/makePairs';
import getProportion, { ProportionType } from './getPairData';
// import getProportion from './getPairData';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  tokens: Array< string >;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPairs = async ({
  userAddress,
  provider,
  tokens,
  signer,
}: Options): Promise<Array< ProportionType >> => {
  const pairs = makePairs(tokens);
  const pairsData = await Promise.all(
    pairs.map(async (token) => {
      const proportion = await getProportion(token.token0, token.token1, userAddress, provider, signer);
      return proportion;
    }),
  );
  return pairsData;
};

export default getPairs;
