import React from 'react';
import { Link } from 'react-router-dom';

const LackOfNoticesMessage = ({ text }) => {
  return (
    <div className="noticesStatus">
      {`${text} `}
      <Link className="noticesStatus__link" to="/add">
        Create the first one!
      </Link>
    </div>
  );
};

export default LackOfNoticesMessage;
