import React, { useState } from 'react';
import Header from '../../shared/header/Header';
import './AddNoticeForm.scss';
import '../../shared/Form.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import 'firebase/storage';

const AddNoticeForm = () => {
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewElement, setPreviewElement] = useState(<div></div>);
  const [productPhoto, setProductPhoto] = useState(null);
  const [isPhotoCompressed, setIsPhotoCompressed] = useState(false);
  const [error, setError] = useState('');

  const clearPhotoInput = () => {
    setProductPhoto(null);
    setIsPhotoCompressed(false);
    setFileName('');
    setPreviewElement(<div></div>);
  };

  const compressImage = async photo => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(photo, options);
      return compressedFile;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhotoChange = async ({ target }) => {
    const reader = new FileReader();

    let photo = target.files[0];

    if (photo !== undefined) {
      const photoName = photo.name;
      setFileName(photoName);

      photo = await compressImage(photo);
      setIsPhotoCompressed(true);
      setProductPhoto(photo);

      reader.addEventListener('load', function () {
        const previewElement = <img className="form__photoPreview" src={this.result} alt="Preview" />;
        setPreviewElement(previewElement);
      });

      reader.readAsDataURL(photo);
    } else {
      clearPhotoInput();
    }
  };

  const handleDescriptionChange = text => {
    text.length < 10 || text.length > 500 ? setIsDescriptionValid(false) : setIsDescriptionValid(true);

    setDescription(text);
    setDescriptionLength(text.length);
  };

  const add = async data => {
    if (productPhoto === null) {
      setError('Something went wrong. Try once again.');
      window.scrollTo(0, 0);
      return false;
    }
    const storageRef = firebase.storage().ref(`notices/${productPhoto.name}`);
    await firebase
      .storage()
      .ref(`notices/${productPhoto.name}`)
      .put(productPhoto)
      .catch(err => console.log(err));

    const photoURL = await storageRef.getDownloadURL();
    await firebase
      .firestore()
      .collection('notices')
      .add({
        ...data,
        productPhoto: photoURL,
      });
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      productDescription: '',
      productPrice: 0,
      productCondition: 1,
      productPhoto: '',
    },
    onSubmit: values => add(values),
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(2, 'Product name is too short.')
        .max(30, 'Product name is too long.')
        .required('This field is required.'),
      productDescription: Yup.string()
        .min(10, 'Must be at least 10 characters.')
        .max(500, `Product's description is too long.`)
        .required('This field is required.'),
      productPrice: Yup.number()
        .min(0, `Product's price must be at least 0 dollars`)
        .max(20, 'The maximum is 20 dollars')
        .required('This field id required.'),
      productCondition: Yup.number()
        .min(1, `Product's condition must be at least 1/5`)
        .max(5, 'You cannot type value greater than 5.')
        .required('This field is required.'),
      productPhoto: Yup.mixed().required('Photo is required.'),
    }),
  });

  return (
    <div className="addNoticeForm__wrapper">
      <Header />
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className="form__header">New notice</h1>
        <span className="form__registrationErrorHandler">{error}</span>
        <label htmlFor="productName">Notice name</label>
        <input className="form__input" type="text" {...formik.getFieldProps('productName')} />

        {formik.touched.productName && formik.errors.productName ? (
          <div className="form__errorHandler">{formik.errors.productName}</div>
        ) : null}

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

        <label htmlFor="productPrice">Price ($)</label>
        <input
          className="form__input"
          type="number"
          min="0"
          max="20"
          step="1"
          {...formik.getFieldProps('productPrice')}
        />

        {formik.touched.productPrice && formik.errors.productPrice ? (
          <div className="form__errorHandler">{formik.errors.productPrice}</div>
        ) : null}

        <label htmlFor="productCondition">Condition 1-5</label>
        <input
          className="form__input"
          type="number"
          min="1"
          max="5"
          step="1"
          {...formik.getFieldProps('productCondition')}
        />

        {formik.touched.productCondition && formik.errors.productCondition ? (
          <div className="form__errorHandler">{formik.errors.productCondition}</div>
        ) : null}

        <div className="form__photoPreview-wrapper">
          {previewElement}
          <FontAwesomeIcon onClick={clearPhotoInput} className="form__photoPreview-wrapper-icon" icon={faTrashAlt} />
        </div>

        <input
          className="form__fileInput"
          type="file"
          accept=".jpg, .jpeg, .png"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          onInput={e => handlePhotoChange(e)}
          id="productPhoto"
        />
        <label htmlFor="productPhoto">
          <FontAwesomeIcon icon={faUpload} />
          <span className="fileLabelSpan">Choose a photo {fileName}</span>
        </label>

        {formik.touched.productPhoto && formik.errors.productPhoto ? (
          <div className="form__errorHandler">{formik.errors.productPhoto}</div>
        ) : null}

        {isPhotoCompressed && productPhoto !== null ? (
          <button className="form__button" type="submit">
            Add notice
          </button>
        ) : (
          <button disabled className="form__button" type="submit">
            Add notice
          </button>
        )}
      </form>
    </div>
  );
};

export default AddNoticeForm;
