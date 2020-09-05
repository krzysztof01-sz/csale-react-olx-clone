import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DescriptionInput from './Components/DescriptionInput';
import FileInput from './Components/FileInput';
import Button from './Components/Button';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import AppLoader from '../loader/Loader';
import WithExtraFunctions from './Components/WithExtraFunctions';

const AddNoticeForm = ({ error, functions, ...statuses }) => {
  const history = useHistory();
  const { id: noticeId } = useParams();
  const [modError, setModError] = useState('');
  const [primaryValues, setPrimaryValues] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productCondition: 1,
    productPhoto: '',
    productUsageState: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function getInitialValues() {
      if (noticeId) {
        const query = await firebase.firestore().doc(`notices/${noticeId}`).get();
        setPrimaryValues({ ...query.data(), id: query.id });
        return setLoading(false);
      } else {
        setLoading(false);
        return setPrimaryValues({
          productName: '',
          productDescription: '',
          productPrice: 0,
          productCondition: 1,
          productPhoto: null,
          productUsageState: '',
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
                await functions.updateNoticeWithoutPhoto(values, primaryValues.id);
              } else {
                await functions.updateNoticeWithPhoto(values, primaryValues.id);
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
            .min(0, `Product's price must be at least 0 dollars.`)
            .max(10000, 'The maximum is 10000 dollars.')
            .integer('You cannot enter a floating point number.')
            .required('This field noticeId required.'),
          productCondition: Yup.number()
            .min(1, `Product's condition must be at least 1-5.`)
            .max(5, 'You cannot type value greater than 5.')
            .integer('You cannot enter a floating point number.')
            .required('This field is required.'),
          productPhoto: Yup.mixed().required('This field is required.'),
          productUsageState: Yup.string().oneOf(['used', 'original']).required('This field is required.'),
        })}>
        {({ setFieldValue, values, handleSubmit }) => {
          const { addingStatus, updatingStatus } = statuses;
          return (
            <div className="AddNoticeForm__wrapper">
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

                <span className="form__radios-label">State</span>
                <div role="radiogroup" className="form__radios">
                  <label className="form__radio">
                    <Field className="form__radio-input" type="radio" name="productUsageState" value="original" />
                    <span className="form__radio-label">Original</span>
                  </label>
                  <label className="form__radio">
                    <Field className="form__radio-input" type="radio" name="productUsageState" value="used" />
                    <span className="form__radio-label">Used</span>
                  </label>
                </div>
                <div className="form__errorHandler">
                  <ErrorMessage name="productUsageState" />
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
            </div>
          );
        }}
      </Formik>
    );
  } else {
    return <AppLoader />;
  }
};

export default WithExtraFunctions(AddNoticeForm);
