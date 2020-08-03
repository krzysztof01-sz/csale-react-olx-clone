import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../../shared/NoticeThumbnailButton.scss';

const EditNoticeButton = () => {
  return (
    <button className="userNoticeThumbnail__button">
      Edit <FontAwesomeIcon icon={faEdit} color="#f1ad3e" />
    </button>
  );
};

export default EditNoticeButton;
