import React from 'react';

const AddNoticeFormButton = ({ isPhotoCompressed, productPhoto }) => {
  if (isPhotoCompressed && productPhoto !== null) {
    return (
      <button className="form__button" type="submit">
        Add notice
      </button>
    );
  } else {
    return (
      <button disabled className="form__button" type="submit">
        Add notice
      </button>
    );
  }
};

export default AddNoticeFormButton;
