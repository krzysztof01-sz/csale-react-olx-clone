import React from 'react';
import LogoutButton from '../../components/buttons/LogoutButton/LogoutButton.js';
import { connect } from 'react-redux';
import HeaderPresenter from './HeaderPresenter';
import AboutButton from '../../components/buttons/AboutButton';
import AddNoticeButton from '../../components/buttons/AddNoticeButton';
import UserProfileButton from '../../components/buttons/UserProfileButton';
import HomeButton from '../../components/buttons/HomeButton';
import OptionsIcon from '../../components/buttons/OptionsIcon/OptionsIcon';

const Header = ({ isProfileLoaded, userNick, loggedUser }) => {
  const isLogoutButtonRendered =
    isProfileLoaded && userNick ? (
      <>
        <div className="header__options-wrapper">
          <AboutButton />
          <UserProfileButton />
          <AddNoticeButton />
        </div>
        <HomeButton />
        <OptionsIcon />
        <LogoutButton />
      </>
    ) : (
      <div className="header-options-wrapper">
        <AboutButton />
      </div>
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
