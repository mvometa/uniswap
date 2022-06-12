import React from 'react';

import NavBar from '../nav/navbar';

import './footer.scss';

const Footer = ():React.ReactElement => (
  <footer className="footer">
    <NavBar swapCallback={() => {}} />
  </footer>
);

export default Footer;
