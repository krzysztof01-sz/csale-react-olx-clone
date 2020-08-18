import React, { useState, useEffect } from 'react';
import LoginPresenter from './LoginPresenter';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const login = ({ email, password }) => {
    setStatus('Logging...');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(({ message }) => {
        setError(message);
        setStatus('');
      });
  };
  return <LoginPresenter status={status} loginUser={login} error={error} />;
};

export default Login;
