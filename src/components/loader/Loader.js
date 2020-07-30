import React from 'react';
import './Loader.scss';
import Loader from 'react-loader-spinner';

const AppLoader = () => {
  return (
    <div className="loader">
      <Loader type="Circles" color="#f1ad3e" height={60} width={60} />
    </div>
  );
};

export default AppLoader;
