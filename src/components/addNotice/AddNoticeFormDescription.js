import React, { useState } from 'react';

const AddNoticeFormDescription = ({ formik }) => {
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const handleDescriptionChange = text => {
    text.length < 10 || text.length > 500 ? setIsDescriptionValid(false) : setIsDescriptionValid(true);

    setDescription(text);
    setDescriptionLength(text.length);
  };

  return (
    <>
      <label htmlFor="productDescription">Description</label>
      <textarea
        rows="5"
        className="form__productDescription"
        name="productDescription"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onInput={({ target }) => handleDescriptionChange(target.value)}
        value={description}></textarea>

      <div className={`form__wordCounter ${isDescriptionValid ? 'validDescription' : 'invalidDescription'}`}>
        Characters: {descriptionLength}/500
      </div>

      {formik.touched.productDescription && formik.errors.productDescription ? (
        <div className="form__errorHandler">{formik.errors.productDescription}</div>
      ) : null}
    </>
  );
};

export default AddNoticeFormDescription;
