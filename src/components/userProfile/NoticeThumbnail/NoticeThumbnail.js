import React from 'react';
import RemoveNoticeButton from '../../buttons/RemoveNoticeButton/RemoveNoticeButton';
import EditNoticeButton from '../../buttons/EditUpdateButton/EditNoticeButton';
import './NoticeThumbnail.scss';

const NoticeThumbnail = ({ notice }) => {
  return (
    <li className="userNoticeThumbnail__wrapper">
      <article>
        <img
          alt={`User notice - ${notice.productName}`}
          src={notice.productPhoto}
          className="userNoticeThumbnail__photo"
        />
        <div className="userNoticeThumbnail__options">
          <EditNoticeButton />
          <RemoveNoticeButton notice={notice} sharedId={notice.sharedId} />
        </div>
      </article>
    </li>
  );
};

export default NoticeThumbnail;
