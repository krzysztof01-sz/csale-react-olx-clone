import React, { Suspense } from 'react';
import './DashboardNotice.scss';
import { Link } from 'react-router-dom';
import AppLoader from '../../loader/Loader';
import DashboardNoticeImage from './DashboardNoticeImage';

const DashboardNotice = ({ notice }) => {
  return (
    <Link key={notice.id} className="dashboardNotice__link" to={`notice/${notice.id}`}>
      <article className="dashboardNotice">
        <Suspense fallback={<AppLoader />}>
          <DashboardNoticeImage imageSource={notice.productPhoto} />
        </Suspense>
        <h2 className="dashboardNotice__name">{notice.productName} </h2>
        <p className="dashboardNotice__description">{notice.productDescription}</p>
        <span className="dashboardNotice__price">{notice.productPrice} $</span>
      </article>
    </Link>
  );
};

export default DashboardNotice;
