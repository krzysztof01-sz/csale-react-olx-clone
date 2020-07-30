import React from 'react';
import './Dashboard.scss';
import DashboardNotice from './notice/DashboardNotice';
import { v1 } from 'uuid';

const DashboardPresenter = ({ notices }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">Notices</header>
      <section className="dashboard__notices">
        {notices.map(singleNotice => (
          <DashboardNotice key={v1()} notice={singleNotice} />
        ))}
      </section>
    </div>
  );
};

export default DashboardPresenter;
