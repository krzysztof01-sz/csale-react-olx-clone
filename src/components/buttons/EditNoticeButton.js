import React from 'react';
import { EditIcon } from '../icons/icons';
import { Link } from 'react-router-dom';

const EditNoticeButton = ({ id }) => {
  return (
    <Link to={`update/${id}`}>
      <button className="userNoticeThumbnail__button">
        Edit <EditIcon />
      </button>
    </Link>
  );
};

export default EditNoticeButton;
