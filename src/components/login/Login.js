import React, { useState } from 'react';
import './Form.scss';
import Header from '../../shared/header/Header';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const errorElement = document.querySelector('span.form__registrationErrorHandler');
  const successElement = document.querySelector('span.form__registrationSuccessHandler');

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        errorElement.innerText = '';
        successElement.innerText = 'Logging succeed.';
        setTimeout(() => {
          history.push('/dashboard');
        }, 900);
      })
      .catch(err => {
        const { message } = err;
        errorElement.innerText = message;
      });
  };

  return (
    <>
      <Header />
      <main>
        <form className="form">
          <h1 className="form__header">Logging</h1>

          <span className="form__registrationErrorHandler"></span>
          <span className="form__registrationSuccessHandler"></span>

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
          />

          <button
            onClick={e => {
              e.preventDefault();
              signIn();
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

export default Login;
