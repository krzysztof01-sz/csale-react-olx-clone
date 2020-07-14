import React from 'react';
import './Header.scss';
import AppIcon from '../../components/appIcon/AppIcon';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__appName">
          Csale <AppIcon />
        </h1>
      </Link>
    </header>
  );
};

export default Header;
