import React from 'react';

const AuthorInfo = ({ userInfo }) => {
  return (
    <aside className="authorInfo">
      <h2 className="authorInfo__header">Owner information</h2> <br />
      <div className="authorInfo-item">Nick: {userInfo?.nick === undefined ? 'Loading' : userInfo.nick}</div>
      <div className="authorInfo-item">
        Account balance: {userInfo?.money === undefined ? 'Loading' : `${userInfo.money}$`}
      </div>
      <div className="authorInfo-item">Email address: {userInfo?.email === undefined ? 'Loading' : userInfo.email}</div>
    </aside>
  );
};

export default AuthorInfo;
