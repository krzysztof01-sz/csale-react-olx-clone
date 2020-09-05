import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../utils/utilsFunctions';

const NoticeCardInfo = ({ notice, noticeCondition }) => {
  return (
    <div className="noticeCard__noticeInfo">
      <div className="noticeCard__name">{notice.productName}</div>
      <div className="noticeCard__description">Description: {notice.productDescription}</div>
      <div className="noticeCard__condition">
        {/* below list is static, so I chose to use 'index' parameter in map method */}
        Condition: {notice.productCondition}{' '}
        {noticeCondition.map((starColor, index) => {
          return <FontAwesomeIcon key={index} icon={faStar} color={starColor} />;
        })}
      </div>
      <div className={`noticeCard__usageState-${notice.productUsageState}`}>State: {notice.productUsageState}</div>
      <div className="noticeCard__bottomWrapper">
        <span className="bottomWrapper__creationDate">{formatDate(notice.creationDate)}</span>
        <span className="bottomWrapper__productPrice">{notice.productPrice}$</span>
      </div>
    </div>
  );
};

export default NoticeCardInfo;
