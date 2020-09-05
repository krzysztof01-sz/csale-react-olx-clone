import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '../icons/icons';

const HomeButton = () => {
  return (
    <Link to="/dashboard">
      <HomeIcon />
    </Link>
  );
};

export default HomeButton;
