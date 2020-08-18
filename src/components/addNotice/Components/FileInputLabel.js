import React from 'react';
import { UploadIcon } from '../../icons/icons';

const FileInputLabel = ({ loading, values, statuses }) => {
  return (
    <>
      <label className="form__fileInput-label" htmlFor="productPhoto">
        <UploadIcon />
        <span className="fileLabelSpan">Choose a photo {values?.productPhoto?.name}</span>
      </label>
      <span className="form__fileInput-status">{loading ? 'Loading...' : null}</span>
      <span className="form__fileInput-status">{statuses.addingStatus ? 'Adding...' : null}</span>
      <span className="form__fileInput-status">{statuses.updatingStatus ? 'Updating...' : null}</span>
    </>
  );
};

export default FileInputLabel;
