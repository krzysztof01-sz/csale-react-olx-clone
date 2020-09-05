import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const LoginPresenter = ({ loginUser, error, status }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid e-mail.').required('This field is required.'),
        password: Yup.string().required('This field is required.'),
      })}
      onSubmit={values => loginUser(values)}>
      <main>
        <Form className="form">
          <h1 className="form__header">Logging</h1>
          <span className="form__mainErrorHandler">{error}</span>

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

          {status}
          <button className="form__button" type="submit">
            Login
          </button>
        </Form>
      </main>
    </Formik>
  );
};

export default LoginPresenter;
