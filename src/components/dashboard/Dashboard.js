import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Header from '../../shared/header/Header';
import AppLoader from '../loader/Loader';
import DashboardPresenter from './DashboardPresenter';

const Dashboard = props => {
  const { notices } = props;

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
        <div style={{ marginTop: 100 }}>Nie ma ogłoszeń!</div>
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
