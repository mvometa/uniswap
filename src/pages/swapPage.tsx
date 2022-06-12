import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SwapForm from '../components/swapForm/swapForm';

import './swapPage.scss';

const SwapPage = ():JSX.Element => (
  <>
    <Header />
    <main className="uniswap">
      <SwapForm />
    </main>
    <div id="background-radial-gradient" />
    <Footer />
  </>
);

export default SwapPage;
