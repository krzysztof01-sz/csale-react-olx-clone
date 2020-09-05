import React, { useState, useEffect } from 'react';
import RegistrationPresenter from './RegistrationPresenter';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Registration = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const signUp = async ({ email, password, nick }) => {
    setStatus('Signing up...');
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user)
      .catch(({ message }) => {
        setError(message);
        setStatus('');
      });
    await firebase.firestore().collection('users').doc(user.uid).set({ nick, money: 100, email });
  };

  return <RegistrationPresenter status={status} signUp={signUp} error={error} />;
};

export default Registration;
