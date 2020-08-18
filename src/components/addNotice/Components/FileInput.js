import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import FileInputLabel from './FileInputLabel';
import PhotoPreview from './PhotoPreview';

const FileInput = ({ values, setFieldValue, statuses }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const compressImage = async photo => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      // setLoading functions must be both before and after imageCompression call
      setLoading(true);
      const compressedFile = await imageCompression(photo, options);
      setLoading(false);

      setError(null);
      return await setFieldValue('productPhoto', compressedFile);
    } catch (err) {
      setLoading(false);
      setFieldValue('productPhoto', null);
      setError(`The photo isn't uploaded. Try again.`);
      return null;
    }
  };

  return (
    <>
      <PhotoPreview values={values}>
        {preview => {
          return (
            <div className="form__photoPreview-wrapper">
              {preview}
              <FontAwesomeIcon
                className="form__photoPreview-wrapper-icon"
                icon={faTrashAlt}
                onClick={() => setFieldValue('productPhoto', null)}
              />
            </div>
          );
        }}
      </PhotoPreview>
      <input
        name="productPhoto"
        onChange={e => compressImage(e.target.files[0])}
        className="form__fileInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        id="productPhoto"
      />
      <FileInputLabel loading={loading} values={values} statuses={statuses} />
      <div className="form__errorHandler">{error}</div>
    </>
  );
};

export default FileInput;
