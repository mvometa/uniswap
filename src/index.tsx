import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import RoutesSwitcher from './routes/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RoutesSwitcher />
  </React.StrictMode>,
);
