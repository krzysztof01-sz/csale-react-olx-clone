import React from 'react';
import './Header.scss';
import LogoutButton from '../../components/buttons/LogoutButton/LogoutButton.js';
import { connect } from 'react-redux';
import AddNoticeButton from '../../components/buttons/AddNoticeButton';
import UserProfileButton from '../../components/buttons/UserProfileButton';
import HeaderPresenter from './HeaderPresenter';

const Header = ({ isProfileLoaded, userNick, loggedUser }) => {
  const isLogoutButtonRendered =
    isProfileLoaded && userNick ? (
      <div className="header__options-wrapper">
        <UserProfileButton />
        <AddNoticeButton />
        <LogoutButton />
      </div>
    ) : (
      <div></div>
    );

  const headerLogoRedirectPathName = loggedUser?.uid ? '/dashboard' : '/';

  return (
    <HeaderPresenter
      isLogoutButtonRendered={isLogoutButtonRendered}
      headerLogoRedirectPathName={headerLogoRedirectPathName}
    />
  );
};

const mapStateToProps = state => {
  return {
    isProfileLoaded: state.firebase.profile.isLoaded,
    userNick: state.firebase.profile.nick,
    loggedUser: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Header);
