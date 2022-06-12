import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import Swap from '../pages/Swap';

const RoutesSwitcher = ():JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Swap />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
