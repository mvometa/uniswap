import { ethers } from 'ethers';
import { TypeLiquid } from '../../components/addLiquidForm/Types';
import { TokenInfo } from '../walletStore/Types';

const SUBMIT_SWAP_FORM = 'SUBMIT_SWAP_FORM';
const SET_SWAP_FORM_ERROR = 'SET_SWAP_FORM_ERROR';
const SET_SWAP_FORM_SUBMITTING = 'SET_SWAP_FORM_SUBMITTING';
const SET_SWAP_FORM_SUCCESS = 'SET_SWAP_FORM_SUCCESS';

type SwapFormState = {
  submittingSwapForm: boolean;
  errorSwapForm: boolean;
  successSwapForm: boolean;
};

export type SagaSwapFormType = {
  type: string;
  payload:SwapFormData;
};

export type SwapFormData = {
  fromTokenValue: string;
  toTokenValue: string;
  slippage?: string;
  balanceToRemove?: string;
  toTokenIndex: TokenInfo;
  fromTokenIndex: TokenInfo;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
  type?: TypeLiquid;
};

export default SwapFormState;
export {
  SUBMIT_SWAP_FORM,
  SET_SWAP_FORM_ERROR,
  SET_SWAP_FORM_SUBMITTING,
  SET_SWAP_FORM_SUCCESS,
};
