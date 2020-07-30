import React from 'react';
import './LogoutButton.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

const LogoutButton = () => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(err => window.alert(err));
  };

  return (
    <button onClick={logout} className="header__logout">
      Logout
    </button>
  );
};

export default LogoutButton;
