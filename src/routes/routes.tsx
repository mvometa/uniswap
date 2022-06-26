import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import LiquidPage from '../pages/addLiquid/addLiquidPage';
import SuccessPage from '../pages/successPage/successPage';
import SwapPage from '../pages/swapPage';

const RoutesSwitcher = ():JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="add" element={<LiquidPage type="add" />} />
      <Route path="remove" element={<LiquidPage type="get" />} />
      <Route path="success" element={<SuccessPage />} />
      <Route path="/" element={<SwapPage />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
