/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import firebaseConfig from './config/firebase-config';

import { Provider, useSelector } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore';
import ReduxThunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

import App from './App';
import * as serviceWorker from './serviceWorker';
import AppLoader from './components/loader/Loader';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div>
        <AppLoader />
      </div>
    );
  return children;
}

firebase.initializeApp(firebaseConfig);

// const createStoreWithFirebase = compose(reduxFirestore(firebase))(createStore);
const store = createStore(
  rootReducer,
  {},
  compose(reduxFirestore(firebase), applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore })))
);

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
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
