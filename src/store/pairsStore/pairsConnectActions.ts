import { AnyAction } from 'redux';
import { ProportionType } from '../../api/getPairData';

import {
  ProportionsFormType,
  SET_PROPORTIONS_SUBMITTING, SET_WALLET_PROPORTIONS, SUBMIT_PROPORTIONS,
} from './Types';

const setSubmittingProportions = (payload: boolean): AnyAction => ({
  type: SET_PROPORTIONS_SUBMITTING,
  payload,
});

const submitProportions = (payload: ProportionsFormType): AnyAction => ({
  type: SUBMIT_PROPORTIONS,
  payload,
});

const setProportions = (payload: ProportionType): AnyAction => ({
  type: SET_WALLET_PROPORTIONS,
  payload,
});

export {
  setSubmittingProportions,
  submitProportions,
  setProportions,
};
