import { useSelector } from 'react-redux';
import BigNumber from '../../constants/bigNumberConfig';
import { RootState } from '../../store/store';
import { TokenInfo } from '../../store/walletStore/Types';
import calculateMinOut from '../../utils/calculateMinOut';
import parseNumber from '../../utils/parseNumber';
import './offer.scss';

type OfferPropsType = {
  value1: string | undefined;
  value1Label: string | undefined;
  value2Label: string | undefined;
  value2: string | undefined;
  hidden: boolean;
  slippage: string;
};

const Offer = (props: OfferPropsType) => {
  const {
    value1,
    value2,
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

  const tokenFrom = tokens.find((elem:TokenInfo) => elem.name === value1Label);
  const tokenTo = tokens.find((elem:TokenInfo) => elem.name === value2Label);
  let comission;
  if (tokenFrom && tokenTo && proportions && value1 && value2 && proportions && proportions.proportion) {
    comission = `Комиссия: ${new BigNumber(value1)
      .minus(new BigNumber(value2))
      .times(new BigNumber(proportions.proportion))
      .abs()
      .decimalPlaces(6)} ${tokenTo?.name}`;
  } else comission = '';
  let equationString;
  if (value1 !== undefined && value2 !== undefined && value1Label && value2Label) {
    equationString = `${parseNumber(value1)} ${value1Label} = ${parseNumber(value2)} ${value2Label}`;
  } else equationString = '';
  let minOffer;
  if (slippage && value2 && tokenTo) {
    minOffer = `Минимально получите: ${new BigNumber(
      calculateMinOut({
        amountOut: value2,
        slippage: Number(slippage),
        decimals: 18,
      }),
    )
      .decimalPlaces(5)
      .toString()} ${tokenTo.name}`;
  } else minOffer = '';

  return hidden ? null : (
    <div className="offer">
      <span className="offer__equasion">{equationString}</span>
      <span className="offer__comission">{comission}</span>
      <span className="offer__min">{minOffer}</span>
    </div>
  );
};

export default Offer;
