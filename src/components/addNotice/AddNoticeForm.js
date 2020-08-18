import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Header from '../../shared/header/Header';
import DescriptionInput from './Components/DescriptionInput';
import FileInput from './Components/FileInput';
import WithExtraFunctions from './Components/WithExtraFunctions';
import Button from './Components/Button';
import AppLoader from '../loader/Loader';
import './AddNoticeForm.scss';
import '../../shared/Form.scss';

const AddNoticeForm = ({ error, functions, ...statuses }) => {
  const history = useHistory();
  const { id: noticeId } = useParams();
  const [modError, setModError] = useState('');
  const [primaryValues, setPrimaryValues] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productCondition: 1,
    productPhoto: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getInitialValues() {
      if (noticeId) {
        const query = await firebase.firestore().doc(`notices/${noticeId}`).get();
        return setPrimaryValues(query.data());
      } else {
        setLoading(false);
        return setPrimaryValues({
          productName: '',
          productDescription: '',
          productPrice: 0,
          productCondition: 1,
          productPhoto: null,
        });
      }
    }
    getInitialValues();
  }, [noticeId]);

  if (!loading) {
    return (
      <Formik
        initialValues={primaryValues}
        enableReinitialize={true}
        onSubmit={async values => {
          if (noticeId) {
            if (values === primaryValues) {
              setModError('No changes detected.');
              return false;
            } else {
              setModError('');

              if (typeof values.productPhoto === 'string') {
                await functions.updateNoticeWithoutPhoto(values, primaryValues.sharedId);
              } else {
                await functions.updateNoticeWithPhoto(values, primaryValues.sharedId);
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
            .min(2, `Product's name is too short.`)
            .max(30, `Product's name is too long.`)
            .required('This field is required.'),
          productDescription: Yup.string()
            .trim()
            .min(10, 'Description must have at least 10 characters.')
            .max(500, `Description is too long.`)
            .required('This field is required.'),
          productPrice: Yup.number()
            .min(0, `Price cannot be less than 0 dollars`)
            .max(10000, 'The maximum price you can enter is 10000 $.')
            .integer('You cannot enter floating point number.')
            .required('This field is required.'),
          productCondition: Yup.number()
            .min(1, `Condition must be within 1-5`)
            .max(5, 'Condition must be within 1-5')
            .integer('You cannot enter floating point number.')
            .required('This field is required.'),
          productPhoto: Yup.mixed().required('This field is required.'),
        })}>
        {({ setFieldValue, values, handleSubmit }) => {
          const { addingStatus, updatingStatus } = statuses;
          return (
            <>
              <Header />
              <Form className="form" onSubmit={handleSubmit}>
                <h1 className="form__header">{noticeId ? 'Update notice' : 'New notice'}</h1>
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
                <Field className="form__input" name="productPrice" type="number" min="0" max="10000" step="1" />
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
                <Button text={noticeId ? 'Update' : 'Add notice'} isDisabled={addingStatus || updatingStatus} />
              </Form>
            </>
          );
        }}
      </Formik>
    );
  } else {
    return <AppLoader />;
  }
};

export default WithExtraFunctions(AddNoticeForm);
