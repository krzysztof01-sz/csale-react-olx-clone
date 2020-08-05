import React from 'react';
import Header from '../../shared/header/Header';
import './AddNoticeForm.scss';
import '../../shared/Form.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DescriptionInput from './Components/DescriptionInput';
import FileInput from './Components/FileInput';
import WithSubmitHandler from './Components/WithSubmitHandler';
import { useHistory } from 'react-router-dom';

const AddNoticeForm = ({ addNotice, error, addingStatus }) => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        productName: '',
        productDescription: '',
        productPrice: 0,
        productCondition: 1,
        productPhoto: null,
      }}
      onSubmit={async values => {
        await addNotice(values);
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
          .required('This field id required.'),
        productCondition: Yup.number()
          .min(1, `Product's condition must be at least 1-5`)
          .max(5, 'You cannot type value greater than 5.')
          .required('This field is required.'),
        productPhoto: Yup.mixed().required('This field is required.'),
      })}>
      {({ setFieldValue, values, handleSubmit }) => {
        return (
          <div className="addNoticeForm__wrapper">
            <Header />
            <Form className="form" onSubmit={values => handleSubmit(values)}>
              <h1 className="form__header">New notice</h1>
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

              <FileInput values={values} setFieldValue={setFieldValue} addingStatus={addingStatus} />
              <div className="form__errorHandler">
                <ErrorMessage name="productPhoto" />
              </div>

              <button className="form__button" type="submit">
                Add notice
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default WithSubmitHandler(AddNoticeForm);
