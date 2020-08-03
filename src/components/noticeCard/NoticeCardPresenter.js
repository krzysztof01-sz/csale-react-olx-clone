import React, { Suspense } from 'react';
import './NoticeCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { v1 } from 'uuid';
import './NoticeCard.scss';
import AppLoader from '../loader/Loader';

const NoticeCardPresenter = ({ notice, productCondition }) => {
  return (
    <>
      <section className="noticeCard__wrapper">
        <Suspense fallback={<AppLoader />}>
          <img alt="Notice" className="noticeCard__photo" src={notice.productPhoto} />
        </Suspense>
        <div className="noticeCard__name">
          {notice.productName} - {notice.productPrice}$
        </div>
        <div className="noticeCard__description">
          Description: <br /> {notice.productDescription}
        </div>
        <div className="noticeCard__condition">
          Condition: {notice.productCondition}{' '}
          {productCondition.map(starColor => {
            return <FontAwesomeIcon key={v1()} icon={faStar} color={starColor} />;
          })}
        </div>
      </section>
      <aside className="authorInfo">User information</aside>
    </>
  );
};

export default NoticeCardPresenter;
