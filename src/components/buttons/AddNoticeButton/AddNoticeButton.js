import React from 'react';
import '../../../shared/header/HeaderIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AddNoticeButton = () => {
  return (
    <Link to="/add">
      <FontAwesomeIcon className="headerIcon" icon={faPlusCircle} color="#cdcdcd" />
    </Link>
  );
};

export default AddNoticeButton;
