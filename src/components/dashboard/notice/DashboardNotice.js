import React, { Suspense } from 'react';
import './DashboardNotice.scss';
import { Link } from 'react-router-dom';
import AppLoader from '../../loader/Loader';
import DashboardNoticeImage from './DashboardNoticeImage';
import { formatDate } from '../../../utils/utilsFunctions';

const DashboardNotice = ({ notice }) => {
  return (
    <Link key={notice.id} className="dashboardNotice__link" to={`notice/${notice.id}`}>
      <article className="dashboardNotice">
        <Suspense fallback={<AppLoader />}>
          <DashboardNoticeImage imageSource={notice.productPhoto} />
        </Suspense>
        <h2 className="dashboardNotice__name">{notice.productName} </h2>
        <p className="dashboardNotice__description">{notice.productDescription}</p>
        <div className="dashboardNotice__bottomWrapper">
          <span className="bottomWrapper__creationDate">{formatDate(notice.creationDate)} $</span>
          <span className="bottomWrapper-productPrice">{notice.productPrice} $</span>
        </div>
      </article>
    </Link>
  );
};

export default DashboardNotice;
