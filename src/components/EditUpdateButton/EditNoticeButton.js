import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../shared/NoticeThumbnailButton.scss';
import { Link } from 'react-router-dom';

const EditNoticeButton = ({ sharedId }) => {
  return (
    <Link to={`update/${sharedId}`}>
      <button className="userNoticeThumbnail__button">
        Edit <FontAwesomeIcon icon={faEdit} color="#f1ad3e" />
      </button>
    </Link>
  );
};

export default EditNoticeButton;
