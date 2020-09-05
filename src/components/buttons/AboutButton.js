import React from 'react';
import { Link } from 'react-router-dom';
import { AboutIcon } from '../icons/icons';

const AboutButton = () => {
  return (
    <Link to="/about">
      <AboutIcon />
    </Link>
  );
};

export default AboutButton;
