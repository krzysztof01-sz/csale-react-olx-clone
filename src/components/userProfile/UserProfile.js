import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NoticeThumbnail from './NoticeThumbnail/NoticeThumbnail';
import LackOfNoticesMessage from '../../shared/LackOfNoticesMessage';
import { formatDate } from '../../utils/utilsFunctions';

const UserProfile = ({ userMoney, userNick, userCreatedAt, userEmail, allNotices, userUid }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  const renderUserNotices = () => {
    if (allNotices) {
      const userNotices = allNotices.filter(notice => notice.createdBy === userUid);
      if (userNotices.length === 0) {
        return <LackOfNoticesMessage text="You don't have any notices." />;
      }
      const notices = userNotices.map(notice => <NoticeThumbnail key={notice.id} notice={notice} />);
      return notices;
    } else {
      return <LackOfNoticesMessage text="Csale haven't got any notices. Create the first notice" />;
    }
  };

  return (
    <>
      <section className="userProfile__wrapper">
        <h1 className="userProfile__greeting">Hello, {userNick}!</h1>
        <article className="userProfile__userData">
          <ul className="userProfile__userInfo-list">
            <li>Money: {userMoney}$</li>
            <li>Email: {userEmail}</li>
            <li>Created: {formatDate(userCreatedAt)}</li>
          </ul>
          <h2 className="userProfile__notices-header">Your notices:</h2>
          <ul className="userProfile__notices-thumbnails">{renderUserNotices()}</ul>
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

export default connect(mapStateToProps)(UserProfile);
