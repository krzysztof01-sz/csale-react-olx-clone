import React from 'react';
import './Header.scss';
import AppIcon from '../../components/appIcon/AppIcon';
import { connect } from 'react-redux';
import LogoutButton from '../../components/logoutButton/LogoutButton';
import { Link } from 'react-router-dom';

const Header = props => {
  const isLogged = Boolean(props.userProfile.nick);
  console.log(isLogged);

  if (isLogged) {
    return (
      <header className="header">
        <Link to="/">
          <h1 className="header__appName">
            Csale <AppIcon />
          </h1>
        </Link>
        <LogoutButton />
      </header>
    );
  } else {
    return (
      <header className="header">
        <h1 className="header__appName">
          Csale <AppIcon />
        </h1>
      </header>
    );
  }
};

const mapStateToProps = state => {
  console.log(state);
  return {
    userProfile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Header);
