import React from 'react';
import DashboardNotice from './notice/DashboardNotice';

const DashboardPresenter = ({ notices }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">Notices</header>
      <section className="dashboard__notices">
        {notices.map(singleNotice => (
          <DashboardNotice key={singleNotice.id} notice={singleNotice} />
        ))}
      </section>
    </div>
  );
};

export default DashboardPresenter;
