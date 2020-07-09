/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import firebaseConfig from './config/firebase-config';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { firebaseReducer, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { reduxFirestore, createFirestoreInstance, firestoreReducer } from 'redux-firestore';

import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const createStoreWithFirebase = compose(reduxFirestore(firebase))(createStore);

const store = createStoreWithFirebase(rootReducer, {});

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
