import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SwapForm from '../components/swapForm/swapForm';

const SwapPage = ():JSX.Element => (
  <>
    <div className="uniswap">
      <Header />
      <SwapForm />
      <Footer />
    </div>
    <div id="background-radial-gradient" />
  </>
);

export default SwapPage;
