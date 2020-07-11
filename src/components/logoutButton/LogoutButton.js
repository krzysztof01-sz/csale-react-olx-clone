import React from 'react';

import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import './LogoutButton.scss';

const LogoutButton = () => {
  const history = useHistory();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push('/'))
      .catch(() => alert('Unknown error occured. Try again later.'));
  };

  return (
    <button onClick={logout} className="header__logout">
      Logout
    </button>
  );
};

export default LogoutButton;
