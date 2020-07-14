import React from 'react';
import Header from '../../shared/header/Header';
import '../login/Form.scss';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import firebase from 'firebase/app';
import 'firebase/auth';

const Registration = () => {
  const history = useHistory();
  const errorElement = document.querySelector('span.form__registrationErrorHandler');
  const successElement = document.querySelector('span.form__registrationSuccessHandler');

  const addUserToDb = async (userId, nick) => {
    return await firebase.firestore().collection('users').doc(userId).set({
      nick,
    });
  };

  const handleFormSubmit = () => {
    const { email, password, nick } = formik.values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        addUserToDb(user.uid, nick);
      })
      .then(() => {
        errorElement.innerText = '';
        successElement.innerText = 'Registration succeed';
        setTimeout(() => history.push('/'), 800);
      })
      .catch(err => {
        const { message } = err;
        errorElement.innerText = message;
      });
  };

  const formik = useFormik({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      repeatedPassword: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: Yup.object({
      nick: Yup.string()
        .min(3, 'Nick is too short.')
        .max(15, 'Nick is too long.')
        .required('This field is required.'),
      email: Yup.string().email('Invalid e-mail.').required('This field is required.'),
      password: Yup.string()
        .min(8, 'Password must have at least 8 characters.')
        .required('This field is required.'),
      repeatedPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password are not equal.')
        .required('This field is required.'),
    }),
  });

  return (
    <>
      <Header />
      <main>
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1 className="form__header">Registration</h1>

          <span className="form__registrationSuccessHandler"></span>
          <span className="form__registrationErrorHandler"></span>

          <label htmlFor="nick">Nick</label>
          <input
            className="form__input"
            type="text"
            name="nick"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nick}
          />

          {formik.touched.nick && formik.errors.nick ? (
            <div className="form__errorHandler">{formik.errors.nick}</div>
          ) : null}

          <label htmlFor="email">E-mail</label>
          <input
            className="form__input"
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          {formik.touched.email && formik.errors.email ? (
            <div className="form__errorHandler">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            className="form__input"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="form__errorHandler">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="repeated-password">Repeat password</label>
          <input
            className="form__input"
            type="password"
            name="repeatedPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatedPassword}
          />

          {formik.touched.repeatedPassword && formik.errors.repeatedPassword ? (
            <div className="form__errorHandler">{formik.errors.repeatedPassword}</div>
          ) : null}

          <button className="form__button" type="submit">
            Sign up
          </button>
        </form>
      </main>
    </>
  );
};

export default Registration;
