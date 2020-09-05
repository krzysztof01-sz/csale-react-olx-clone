import React from 'react';

const getYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__columnLeft">
        <div className="footer__text">Created by: Krzysztof Szczepański</div>
      </div>
      <div className="footer__columnRight">
        <div className="footer__text">{getYear()} All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
