import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Header from '../../shared/header/Header';
import Notice from './notice/Notice';
import './Dashboard.scss';
import './notice/Notice.scss';
import Loader from '../loader/Loader';

const Dashboard = props => {
  const { isLoaded } = props.userProfile;
  const { notices } = props;

  if (isLoaded && notices) {
    return (
      <>
        <Header />
        <div className="dashboard">
          <header className="dashboard__header">Notices</header>
          <section className="dashboard__notices">
            {notices.map((singleNotice, index) => (
              <Notice key={index} notice={singleNotice} />
            ))}
          </section>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

const mapStateToProps = state => {
  return {
    userProfile: state.firebase.profile,
    notices: state.firestore.ordered.notices,
  };
};

export default compose(
  firestoreConnect([{ collection: 'notices' }]),
  connect(mapStateToProps)
)(Dashboard);
