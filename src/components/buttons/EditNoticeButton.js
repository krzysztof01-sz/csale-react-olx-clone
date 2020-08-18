import React from 'react';
import { EditIcon } from '../icons/icons';
import '../../shared/NoticeThumbnailButton.scss';
import { Link } from 'react-router-dom';

const EditNoticeButton = ({ sharedId }) => {
  return (
    <Link to={`update/${sharedId}`}>
      <button className="userNoticeThumbnail__button">
        Edit <EditIcon />
      </button>
    </Link>
  );
};

export default EditNoticeButton;
