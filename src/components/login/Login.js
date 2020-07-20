import React from 'react';
import '../../shared/Form.scss';
import Header from '../../shared/header/Header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'firebase/auth';
import { connect } from 'react-redux';
import { login } from '../../redux/authFunctions';

const Login = ({ loginUser }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => loginUser(values),
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid e-mail.').required('This field is required.'),
      password: Yup.string().required('This field is required.'),
    }),
  });

  return (
    <>
      <Header />
      <main>
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1 className="form__header">Logging</h1>

          <span className="form__registrationErrorHandler"></span>

          <label htmlFor="email">E-mail</label>
          <input
            className="form__input"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nick}
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
            value={formik.values.nick}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="form__errorHandler">{formik.errors.password}</div>
          ) : null}

          <button className="form__button" type="submit">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: credencials => dispatch(login(credencials)),
});

export default connect(null, mapDispatchToProps)(Login);
