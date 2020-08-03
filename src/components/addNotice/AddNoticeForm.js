import React, { useState } from 'react';
import Header from '../../shared/header/Header';
import AddNoticeFormDescription from './AddNoticeFormDescription';
import AddNoticeFormFilenameLabel from './AddNoticeFormFilenameLabel';
import AddNoticeFormButton from './AddNoticeFormButton';
import './AddNoticeForm.scss';
import '../../shared/Form.scss';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddNoticeForm = () => {
  const [fileName, setFileName] = useState('');
  const [previewElement, setPreviewElement] = useState(<div></div>);
  const [isPhotoCompressed, setIsPhotoCompressed] = useState(false);
  const [productPhoto, setProductPhoto] = useState(null);
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
      setError(err);
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

  const addNotice = async data => {
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
      .catch(err => setError(err.message));

    const photoURL = await storageRef.getDownloadURL();
    await firebase
      .firestore()
      .collection('notices')
      .add({
        ...data,
        productPhoto: photoURL,
        createdBy: firebase.auth().currentUser.uid,
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
    onSubmit: values => addNotice(values),
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
        <span className="form__mainErrorHandler">{error}</span>
        <label htmlFor="productName">Notice name</label>
        <input className="form__input" type="text" {...formik.getFieldProps('productName')} />

        {formik.touched.productName && formik.errors.productName ? (
          <div className="form__errorHandler">{formik.errors.productName}</div>
        ) : null}

        <AddNoticeFormDescription formik={formik} />

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
        <AddNoticeFormFilenameLabel filename={fileName} />

        {formik.touched.productPhoto && formik.errors.productPhoto ? (
          <div className="form__errorHandler">{formik.errors.productPhoto}</div>
        ) : null}

        <AddNoticeFormButton isPhotoCompressed={isPhotoCompressed} productPhoto={productPhoto} />
      </form>
    </div>
  );
};

export default AddNoticeForm;
