import React from 'react';
import './Header.scss';
import AppIcon from '../../components/appIcon/AppIcon';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/buttons/LogoutButton/LogoutButton.js';
import { connect } from 'react-redux';
import AddNoticeButton from '../../components/buttons/AddNoticeButton/AddNoticeButton';

const Header = ({ isProfileLoaded, userNick }) => {
  const isLogoutButtonRendered =
    isProfileLoaded && userNick ? (
      <div className="header__options-wrapper">
        <AddNoticeButton />
        <LogoutButton />
      </div>
    ) : (
      <div></div>
    );

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__appName">
          Csale <AppIcon />
        </h1>
      </Link>
      {isLogoutButtonRendered}
    </header>
  );
};

const mapStateToProps = state => ({
  isProfileLoaded: state.firebase.profile.isLoaded,
  userNick: state.firebase.profile.nick,
});

export default connect(mapStateToProps)(Header);
