import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import SwapPage from '../pages/swapPage';

const RoutesSwitcher = ():JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SwapPage />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
