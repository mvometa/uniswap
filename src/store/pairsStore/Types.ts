import { ethers } from 'ethers';
import { ProportionType } from '../../api/getPairData';

const SET_WALLET_PROPORTIONS = 'SET_WALLET_PROPORTIONS';
const SUBMIT_PROPORTIONS = 'SUBMIT_PROPORTIONS';
const SET_PROPORTIONS_SUBMITTING = 'SET_PROPORTIONS_SUBMITTING';

type PairsConnectionState = {
  submittingPairs: boolean;
  errorPairs: boolean;
  successPairs:boolean;
  proportion: ProportionType | undefined;
};

export type ProportionsFormType = {
  token1adress: string;
  token2adress: string;
  userWalletAdress: string;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
};

export type ProportionSagaType = {
  type: string;
  payload: ProportionsFormType;
};

export default PairsConnectionState;
export {
  SET_WALLET_PROPORTIONS,
  SUBMIT_PROPORTIONS,
  SET_PROPORTIONS_SUBMITTING,
};
