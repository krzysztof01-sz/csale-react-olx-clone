import React from 'react';
import '../../shared/header/HeaderIcon.scss';
import { HeaderPlusIcon } from '../icons/icons';
import { Link } from 'react-router-dom';

const AddNoticeButton = () => {
  return (
    <Link to="/add">
      <HeaderPlusIcon />
    </Link>
  );
};

export default AddNoticeButton;
