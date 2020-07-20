import React from 'react';
import './LogoutButton.scss';
import { connect } from 'react-redux';
import { logout } from '../../../redux/authFunctions';

const LogoutButton = ({ logout }) => {
  return (
    <button onClick={logout} className="header__logout">
      Logout
    </button>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
