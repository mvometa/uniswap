import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import SwapPage from '../pages/swapPage';

const RoutesSwitcher = ():JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="add" element={<SwapPage type="add" />} />
      <Route path="remove" element={<SwapPage type="get" />} />
      <Route path="/" element={<SwapPage type="swap" />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
