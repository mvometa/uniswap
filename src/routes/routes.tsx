import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import AddLiquidPage from '../pages/addLiquid/addLiquidPage';
import SwapPage from '../pages/swapPage';

const RoutesSwitcher = ():JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="add" element={<AddLiquidPage />} />
      <Route path="/" element={<SwapPage />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
