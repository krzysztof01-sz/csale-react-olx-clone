import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const AddNoticeFormFilenameLabel = ({ filename }) => {
  return (
    <label htmlFor="productPhoto">
      <FontAwesomeIcon icon={faUpload} />
      <span className="fileLabelSpan">Choose a photo {filename}</span>
    </label>
  );
};

export default AddNoticeFormFilenameLabel;
