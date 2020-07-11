/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import firebaseConfig from './config/firebase-config';

import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import rootReducer from './redux/rootReducer';

import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(reduxFirestore(firebase))(createStore);
const store = createStoreWithFirebase(rootReducer, {});

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
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
