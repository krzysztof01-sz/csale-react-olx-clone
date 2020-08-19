import React from 'react';
import RemoveNoticeButton from '../../buttons/RemoveNoticeButton';
import EditNoticeButton from '../../buttons/EditNoticeButton';
import './NoticeThumbnail.scss';

const NoticeThumbnail = ({ notice }) => {
  return (
    <li className="userNoticeThumbnail">
      <article>
        <img
          alt={`User notice - ${notice.productName}`}
          src={notice.productPhoto}
          className="userNoticeThumbnail__photo"
        />
        <div className="userNoticeThumbnail__photo-label">{notice.productName}</div>
        <div className="userNoticeThumbnail__options">
          <EditNoticeButton id={notice.id} />
          <RemoveNoticeButton id={notice.id} />
        </div>
      </article>
    </li>
  );
};

export default NoticeThumbnail;
