import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UserProfileButton = () => {
  return (
    <Link to="/profile">
      <FontAwesomeIcon className="headerIcon" icon={faUserCircle} color="#cdcdcd" />
    </Link>
  );
};

export default UserProfileButton;
