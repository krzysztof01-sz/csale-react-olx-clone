import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../shared/NoticeThumbnailButton.scss';

const RemoveNoticeButton = () => {
  return (
    <button className="userNoticeThumbnail__button">
      Del <FontAwesomeIcon icon={faTrashAlt} color="#f1ad3e" />
    </button>
  );
};

export default RemoveNoticeButton;
