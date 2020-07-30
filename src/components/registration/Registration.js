import React, { useState } from 'react';
import RegistrationPresenter from './RegistrationPresenter';
import firebase from 'firebase/app';
import 'firebase/auth';

const Registration = () => {
  const [error, setError] = useState('');

  const signUp = ({ email, password, nick }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => firebase.firestore().collection('users').doc(user.uid).set({ nick }))
      .catch(({ message }) => {
        setError(message);
      });
  };

  return <RegistrationPresenter signUp={signUp} error={error} />;
};

export default Registration;
