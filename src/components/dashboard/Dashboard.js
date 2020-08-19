import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppLoader from '../loader/Loader';
import DashboardPresenter from './DashboardPresenter';
import LackOfNoticesMessage from '../../shared/LackOfNoticesMessage';

const Dashboard = ({ notices }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  const renderDashboard = () => {
    if (notices?.length > 0) {
      return <DashboardPresenter notices={notices} />;
    } else if (notices?.length === 0) {
      return <LackOfNoticesMessage text="There is no notices." />;
    } else return <AppLoader />;
  };

  return renderDashboard();
};

const mapStateToProps = state => {
  return {
    notices: state.firestore.ordered.notices,
  };
};

export default connect(mapStateToProps)(Dashboard);
