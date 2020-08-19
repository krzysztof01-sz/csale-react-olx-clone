import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Csale</h2>
      <span className="footer__text">Author: Krzysztof Szczepański</span>
      <br />
      <span className="footer__text">{new Date().getFullYear()} All Rights Reserved</span>
    </footer>
  );
};

export default Footer;
