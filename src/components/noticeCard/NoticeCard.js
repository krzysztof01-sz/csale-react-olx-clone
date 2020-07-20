import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './NoticeCard.scss';

const NoticeCard = ({ notice }) => {
  window.scrollTo(0, 0);

  const brightStarColor = '#f1ad3e';
  const dimStarColor = '#cdcdcd';
  const maxProductCondition = 5;

  const renderNoticeCondition = noticeCondition => {
    const renderOrder = [];

    for (let i = 1; i <= maxProductCondition; i++) {
      i <= noticeCondition ? renderOrder.push(brightStarColor) : renderOrder.push(dimStarColor);
    }
    const elements = renderOrder.map((starColor, index) => {
      return <FontAwesomeIcon key={index} icon={faStar} color={starColor} />;
    });
    return elements;
  };

  return (
    <div className="noticeCard__wrapper">
      <img className="noticeCard__photo" alt="Notice" src="https://unsplash.it/1920/1080" />
      <div className="noticeCard__name">
        {notice.name} - {notice.price}$
      </div>
      <div className="noticeCard__description">
        Description: <br /> {notice.description}
      </div>
      <div className="noticeCard__condition">
        Condition: {notice.condition} {renderNoticeCondition(notice.condition)}
      </div>
    </div>
  );
};

export default NoticeCard;
