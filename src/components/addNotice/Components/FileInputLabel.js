import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const FileInputLabel = ({ loading, values, addingStatus }) => {
  console.log(addingStatus);
  return (
    <>
      <label className="form__fileInput-label" htmlFor="productPhoto">
        <FontAwesomeIcon icon={faUpload} />
        <span className="fileLabelSpan">Choose a photo {values?.productPhoto?.name}</span>
      </label>
      <span className="form__fileInput-status">{loading ? 'Loading...' : null}</span>
      <span className="form__fileInput-status">{addingStatus ? 'Adding...' : null}</span>
    </>
  );
};

export default FileInputLabel;
