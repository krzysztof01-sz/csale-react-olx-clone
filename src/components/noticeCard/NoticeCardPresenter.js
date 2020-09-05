import React, { Suspense } from 'react';
import AppLoader from '../loader/Loader';
import AuthorInfo from './AuthorInfo/AuthorInfo';
import NoticeCardInfo from './NoticeCardInfo/NoticeCardInfo';

const NoticeCardPresenter = ({ notice, productCondition, userInfo }) => {
  return (
    <section className="noticeCard__wrapper">
      <Suspense fallback={<AppLoader />}>
        <img alt="Notice" className="noticeCard__photo" src={notice.productPhoto} />
      </Suspense>
      <NoticeCardInfo notice={notice} noticeCondition={productCondition} />
      <AuthorInfo userInfo={userInfo} />
    </section>
  );
};

export default NoticeCardPresenter;
