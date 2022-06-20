import { ethers } from 'ethers';
import { TokenInfo } from '../walletStore/Types';

const SUBMIT_SWAP_FORM = 'SUBMIT_SWAP_FORM';
const SET_SWAP_FORM_ERROR = 'SET_SWAP_FORM_ERROR';
const SET_SWAP_FORM_SUBMITTING = 'SET_SWAP_FORM_SUBMITTING';

type SwapFormState = {
  submittingSwapForm: boolean;
  errorSwapForm: boolean;
};

export type SagaSwapFormType = {
  type: string;
  payload:SwapFormData;
};

export type SwapFormData = {
  fromTokenValue: number;
  toTokenValue: number;
  slippage: number;
  toTokenIndex: TokenInfo;
  fromTokenIndex: TokenInfo;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
};

export default SwapFormState;
export {
  SUBMIT_SWAP_FORM,
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
};
