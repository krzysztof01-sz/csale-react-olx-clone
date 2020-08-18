import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { v1 } from 'uuid';
import { formatDate } from '../../../utils/utilsFunctions';

const NoticeCardInfo = ({ notice, noticeCondition }) => {
  return (
    <div className="noticeCard__noticeInfo">
      <div className="noticeCard__name">{notice.productName}</div>
      <div className="noticeCard__description">Description: {notice.productDescription}</div>
      <div className="noticeCard__condition">
        Condition: {notice.productCondition}{' '}
        {noticeCondition.map(starColor => {
          return <FontAwesomeIcon key={v1()} icon={faStar} color={starColor} />;
        })}
      </div>
      <div className="noticeCard__bottomWrapper">
        <span className="bottomWrapper__creationDate">{formatDate(notice.creationDate)}</span>
        <span className="bottomWrapper__productPrice">{notice.productPrice}$</span>
      </div>
    </div>
  );
};

export default NoticeCardInfo;
