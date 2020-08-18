import React, { useState, useEffect } from 'react';
import LoginPresenter from './LoginPresenter';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [error, setError] = useState('');
  const login = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(({ message }) => {
        setError(message);
      });
  };
  return <LoginPresenter loginUser={login} error={error} />;
};

export default Login;
