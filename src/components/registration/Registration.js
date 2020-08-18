import React, { useState, useEffect } from 'react';
import RegistrationPresenter from './RegistrationPresenter';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Registration = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [error, setError] = useState('');

  const signUp = async ({ email, password, nick }) => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user)
      .catch(({ message }) => setError(message));
    await firebase.firestore().collection('users').doc(user.uid).set({ nick, money: 100 });
  };

  return <RegistrationPresenter signUp={signUp} error={error} />;
};

export default Registration;
