import BigNumber from '../constants/bigNumberConfig';

const parseBigNumber = (value: string | undefined): string => {
  if (value !== undefined) {
    return new BigNumber(value).decimalPlaces(5).toString();
  }
  return '';
};

export default parseBigNumber;
