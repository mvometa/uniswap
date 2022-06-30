import { useSelector } from 'react-redux';
import BigNumber from '../../constants/bigNumberConfig';
import { RootState } from '../../store/store';
import { TokenInfo } from '../../store/walletStore/Types';
import calculateMinOut from '../../utils/calculateMinOut';
import parseNumber from '../../utils/parseNumber';
import './offer.scss';

type OfferPropsType = {
  fromTokenValue: string | undefined;
  value1Label: string | undefined;
  value2Label: string | undefined;
  hidden: boolean;
  slippage: string;
};

const Offer = (props: OfferPropsType) => {
  const {
    fromTokenValue,
    hidden,
    value1Label,
    value2Label,
    slippage,
  } = props;

  const {
    tokens,
  } = { ...useSelector((state:RootState) => state.WalletConnectReducer) };

  const {
    proportions,
  } = { ...useSelector((state:RootState) => state.PairsConnectReducer) };

  const tokenTo = tokens.find((elem:TokenInfo) => elem.name === value2Label);
  const slippageFormatted = slippage === '' ? '0' : slippage;
  let toTokenValue;
  if (fromTokenValue && proportions?.proportion) {
    toTokenValue = new BigNumber(fromTokenValue).div(proportions.proportion).toString();
  }
  let equationString;
  if (fromTokenValue !== undefined && toTokenValue !== undefined && value1Label && value2Label) {
    equationString = `${parseNumber(fromTokenValue)} ${value1Label} = ${parseNumber(toTokenValue)} ${value2Label}`;
  } else equationString = '';
  let minOffer;
  if (toTokenValue && tokenTo) {
    minOffer = `Минимально получите: ${new BigNumber(
      calculateMinOut({
        amountOut: toTokenValue,
        slippage: slippageFormatted,
        decimals: 18,
      }),
    )
      .decimalPlaces(5)
      .toString()} ${tokenTo.name}`;
  } else minOffer = '';

  return hidden ? null : (
    <div className="offer">
      <span className="offer__equasion">{equationString}</span>
      <span className="offer__min">{minOffer}</span>
    </div>
  );
};

export default Offer;
