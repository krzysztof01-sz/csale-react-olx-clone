import React, { useState, useEffect } from 'react';
import Header from '../../shared/header/Header';
import './AddNoticeForm.scss';
import '../../shared/Form.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DescriptionInput from './Components/DescriptionInput';
import FileInput from './Components/FileInput';
import WithFunctions from './Components/WithFunctions';
import Button from './Components/Button';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import AppLoader from '../loader/Loader';

const AddNoticeForm = ({ error, functions, ...statuses }) => {
  const history = useHistory();
  const { id: urlId } = useParams();
  const [modError, setModError] = useState('');
  const [noticeToUpdate, setNoticeToUpdate] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productCondition: 1,
    productPhoto: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (urlId) {
      async function fetchData() {
        await firebase
          .firestore()
          .doc(`notices/${urlId}`)
          .get()
          .then(doc => setNoticeToUpdate(doc.data()));
        setLoading(false);
      }
      fetchData();
    } else setLoading(false);
  }, [urlId]);

  if (!loading) {
    return (
      <Formik
        initialValues={noticeToUpdate}
        onSubmit={async values => {
          if (urlId) {
            if (values === noticeToUpdate) {
              setModError('No changes detected.');
              return false;
            } else {
              setModError('');

              if (typeof values.productPhoto === 'string') {
                await functions.updateNoticeWithoutPhoto(values, noticeToUpdate.sharedId);
              } else {
                await functions.updateNoticeWithPhoto(values, noticeToUpdate.sharedId);
              }
            }
          } else {
            if (values.productPhoto !== null) {
              await functions.addNotice(values);
            } else return false;
          }
          history.push('/dashboard');
        }}
        validationSchema={Yup.object({
          productName: Yup.string()
            .trim()
            .min(2, 'Product name is too short.')
            .max(30, 'Product name is too long.')
            .required('This field is required.'),
          productDescription: Yup.string()
            .trim()
            .min(10, 'Must be at least 10 characters.')
            .max(500, `Product's description is too long.`)
            .required('This field is required.'),
          productPrice: Yup.number()
            .min(0, `Product's price must be at least 0 dollars`)
            .max(20, 'The maximum is 20 dollars')
            .required('This field urlId required.'),
          productCondition: Yup.number()
            .min(1, `Product's condition must be at least 1-5`)
            .max(5, 'You cannot type value greater than 5.')
            .required('This field is required.'),
          productPhoto: Yup.mixed().required('This field is required.'),
        })}>
        {({ setFieldValue, values, handleSubmit, isSubmitting }) => {
          return (
            <div className="AddNoticeForm__wrapper">
              <Header />
              <Form className="form" onSubmit={handleSubmit}>
                <h1 className="form__header">{urlId ? 'Update notice' : 'New notice'}</h1>
                <span className="form__mainErrorHandler">{error}</span>

                <label htmlFor="productName">Notice name</label>
                <Field className="form__input" type="text" name="productName" />
                <div className="form__errorHandler">
                  <ErrorMessage name="productName" />
                </div>

                <label htmlFor="productDescription">Description</label>
                <Field as={DescriptionInput} name="productDescription" />
                <div className="form__errorHandler">
                  <ErrorMessage name="productDescription" />
                </div>

                <label htmlFor="productPrice">Price ($)</label>
                <Field className="form__input" name="productPrice" type="number" min="0" max="20" step="1" />
                <div className="form__errorHandler">
                  <ErrorMessage name="productPrice" />
                </div>

                <label htmlFor="productCondition">Condition 1-5</label>
                <Field className="form__input" name="productCondition" type="number" min="1" max="5" step="1" />
                <div className="form__errorHandler">
                  <ErrorMessage name="productCondition" />
                </div>

                <FileInput values={values} setFieldValue={setFieldValue} statuses={statuses} />
                <div className="form__errorHandler">
                  <ErrorMessage name="productPhoto" />
                </div>

                <div>{modError}</div>
                <Button text={urlId ? 'Update' : 'Add notice'} isDisabled={isSubmitting} />
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  } else {
    return <AppLoader />;
  }
};

export default WithFunctions(AddNoticeForm);
