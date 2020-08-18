import React from 'react';
import { Link } from 'react-router-dom';
import { BasketIcon } from '../../components/icons/icons';

const HeaderPresenter = ({ isLogoutButtonRendered, headerLogoRedirectPathName }) => {
  return (
    <header className="header">
      <Link to={headerLogoRedirectPathName}>
        <h1 className="header__appName">
          Csale <BasketIcon />
        </h1>
      </Link>
      {isLogoutButtonRendered}
    </header>
  );
};

export default HeaderPresenter;
