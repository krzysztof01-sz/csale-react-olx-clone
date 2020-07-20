import React from 'react';
import Header from '../../shared/header/Header';
import '../../shared/Form.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import 'firebase/auth';
import { connect } from 'react-redux';
import { signUp } from '../../redux/authFunctions';

const Registration = ({ signUp }) => {
  const formik = useFormik({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      repeatedPassword: '',
    },
    onSubmit: values => signUp(values),
    validationSchema: Yup.object({
      nick: Yup.string().min(3, 'Nick is too short.').max(15, 'Nick is too long.').required('This field is required.'),
      email: Yup.string().email('Invalid e-mail.').required('This field is required.'),
      password: Yup.string().min(8, 'Password must have at least 8 characters.').required('This field is required.'),
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

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(signUp(credentials)),
});

export default connect(null, mapDispatchToProps)(Registration);
