import React from 'react';
import { useImage } from 'react-image';

const DashboardNoticeImage = ({ imageSource }) => {
  const { src } = useImage({
    srcList: imageSource,
  });

  return <img alt="notice" className="dashboardNotice__photo" src={src} />;
};

export default DashboardNoticeImage;
