import React from 'react';
import AppIcon from '../../components/appIcon/AppIcon';
import { Link } from 'react-router-dom';

const HeaderPresenter = ({ isLogoutButtonRendered, headerLogoRedirectPathName }) => {
  return (
    <header className="header">
      <Link to={headerLogoRedirectPathName}>
        <h1 className="header__appName">
          Csale <AppIcon />
        </h1>
      </Link>
      {isLogoutButtonRendered}
    </header>
  );
};

export default HeaderPresenter;
