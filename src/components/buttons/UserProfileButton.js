import React from 'react';
import { HeaderUserIcon } from '../icons/icons';
import { Link } from 'react-router-dom';

const UserProfileButton = () => {
  return (
    <Link to="/profile">
      <HeaderUserIcon />
    </Link>
  );
};

export default UserProfileButton;
