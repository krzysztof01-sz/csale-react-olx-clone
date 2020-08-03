import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from '../../shared/header/Header';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NoticeThumbnail from './NoticeThumbnail/NoticeThumbnail';
import { v1 } from 'uuid';

const UserProfile = props => {
  const { userMoney, userNick, userCreatedAt, userEmail, allNotices, userUid } = props;

  const renderUserNotices = () => {
    if (allNotices) {
      const userNotices = allNotices.filter(notice => notice.createdBy === userUid);
      const notices = userNotices.map(notice => <NoticeThumbnail key={v1()} notice={notice} />);
      return notices;
    } else {
      return <div>You don't have notices. Make a first one!</div>;
    }
  };

  const date = moment(Number(userCreatedAt)).calendar();
  const formattedDate = String(date).replace(/["/"]/g, '.');

  return (
    <>
      <Header />
      <section className="userProfile__wrapper">
        <h1 className="userProfile__greeting">Hello, {userNick}!</h1>
        <article className="userProfile__userData">
          <ul className="userProfile__userInfo">
            <li>Money: {userMoney}$</li>
            <li>Email: {userEmail}</li>
            <li>Created at: {formattedDate}</li>
          </ul>
          <h2 className="userProfile__notices-header">Your notices:</h2>
          <ul className="userNoticeThumbnails">{renderUserNotices()}</ul>
        </article>
      </section>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userMoney: state.firebase.profile.money,
    userNick: state.firebase.profile.nick,
    userCreatedAt: state.firebase.auth.createdAt,
    userEmail: state.firebase.auth.email,
    allNotices: state.firestore.ordered.notices,
    userUid: state.firebase.auth.uid,
  };
};

export default compose(firestoreConnect([{ collection: 'notices' }]), connect(mapStateToProps))(UserProfile);
