import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Header from '../../shared/header/Header';
import AppLoader from '../loader/Loader';
import DashboardPresenter from './DashboardPresenter';
import LackOfNoticesMessage from '../../shared/LackOfNoticesMessage';

const Dashboard = ({ notices }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (notices?.length > 0) {
    return (
      <>
        <Header />
        <DashboardPresenter notices={notices} />
      </>
    );
  } else if (notices?.length === 0) {
    return (
      <>
        <Header />
        <LackOfNoticesMessage text="There is no notices." />
      </>
    );
  } else {
    return <AppLoader />;
  }
};

const mapStateToProps = state => {
  return {
    userProfile: state.firebase.profile,
    notices: state.firestore.ordered.notices,
  };
};

export default compose(firestoreConnect([{ collection: 'notices' }]), connect(mapStateToProps))(Dashboard);
