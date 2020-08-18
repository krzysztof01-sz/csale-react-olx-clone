import React from 'react';
import Header from '../../shared/header/Header';
import '../../shared/Form.scss';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const RegistrationPresenter = ({ signUp, error, status }) => {
  return (
    <Formik
      initialValues={{
        nick: '',
        email: '',
        password: '',
        repeatedPassword: '',
      }}
      validationSchema={Yup.object({
        nick: Yup.string()
          .min(3, 'Nick is too short.')
          .max(15, 'Nick is too long.')
          .required('This field is required.'),
        email: Yup.string().email('Invalid e-mail.').required('This field is required.'),
        password: Yup.string().min(8, 'Password must have at least 8 characters.').required('This field is required.'),
        repeatedPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Password are not equal.')
          .required('This field is required.'),
      })}
      onSubmit={values => signUp(values)}>
      <>
        <Header />
        <main>
          <Form className="form">
            <h1 className="form__header">Registration</h1>
            <span className="form__mainErrorHandler">{error}</span>

            <label htmlFor="nick">Nick</label>
            <Field className="form__input" type="text" name="nick" />
            <div className="form__errorHandler">
              <ErrorMessage name="nick" />
            </div>

            <label htmlFor="email">E-mail</label>
            <Field className="form__input" type="email" name="email" />
            <div className="form__errorHandler">
              <ErrorMessage name="email" />
            </div>

            <label htmlFor="password">Password</label>
            <Field className="form__input" type="password" name="password" />
            <div className="form__errorHandler">
              <ErrorMessage name="password" />
            </div>

            <label htmlFor="repeatedPassword">Repeat password</label>
            <Field className="form__input" type="password" name="repeatedPassword" />
            <div className="form__errorHandler">
              <ErrorMessage name="repeatedPassword" />
            </div>

            {status}
            <button className="form__button" type="submit">
              Sign up
            </button>
          </Form>
        </main>
      </>
    </Formik>
  );
};

export default RegistrationPresenter;
