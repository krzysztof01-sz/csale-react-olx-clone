import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PhotoPreview = ({ values, setFieldValue }) => {
  return (
    <div className="form__photoPreview-wrapper">
      {!values.productPhoto ? (
        <div></div>
      ) : (
        <img className="form__photoPreview" src={URL.createObjectURL(values.productPhoto)} alt="Preview" />
      )}
      <FontAwesomeIcon
        className="form__photoPreview-wrapper-icon"
        icon={faTrashAlt}
        onClick={() => setFieldValue('productPhoto', null)}
      />
    </div>
  );
};

export default PhotoPreview;
