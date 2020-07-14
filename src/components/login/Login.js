import React, { useState } from 'react';
import './Form.scss';
import Header from '../../shared/header/Header';
// import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import { login } from '../../redux/actionCreators/authActionCreators';
import { connect } from 'react-redux';

const Login = ({ login, loginFeedback, loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  // const errorElement = document.querySelector('span.form__registrationErrorHandler');
  // const successElement = document.querySelector('span.form__registrationSuccessHandler');

  // const validationElements = () => {
  //   if (success) {
  //     return <span className="form__registrationErrorHandler">{loginFeedback}</span>;
  //   } else {
  //     return <span className="form__registrationSuccessHandler">{loginFeedback}</span>;
  //   }
  // };

  if (loginSuccess) setTimeout(() => history.push('/dashboard'), 900);

  const validationElements = loginSuccess ? (
    <span className="form__registrationSuccessHandler">{loginFeedback}</span>
  ) : (
    <span className="form__registrationErrorHandler">{loginFeedback}</span>
  );

  return (
    <>
      <Header />
      <main>
        <form className="form">
          <h1 className="form__header">Logging</h1>

          {validationElements}

          <label htmlFor="email">E-mail</label>
          <input
            onChange={({ target }) => setEmail(target.value)}
            className="form__input"
            type="email"
            name="email"
            value={email}
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={({ target }) => setPassword(target.value)}
            className="form__input"
            type="password"
            name="password"
            value={password}
            required
          />

          <button
            onClick={e => {
              e.preventDefault();
              login(email, password);
            }}
            className="form__button"
            type="submit">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loginFeedback: state.loginAuth.message,
    loginSuccess: state.loginAuth.success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
