import React from 'react';

const PhotoPreview = ({ children, values }) => {
  const renderPhotoPreview = () => {
    if (!values.productPhoto) {
      return <div></div>;
    } else if (typeof values.productPhoto === 'string') {
      return <img className="form__photoPreview" src={values.productPhoto} alt="Preview" />;
    } else {
      return <img className="form__photoPreview" src={URL.createObjectURL(values.productPhoto)} alt="Preview" />;
    }
  };
  return children(renderPhotoPreview());
};

export default PhotoPreview;
