export const signUp = ({ email, password, nick }) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const errorElement = document.querySelector('.form__registrationErrorHandler');
  getFirebase()
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => getFirestore().collection('users').doc(user.uid).set({ nick }))
    .catch(({ message }) => {
      errorElement.innerText = '';
      setTimeout(() => {
        errorElement.innerText = message;
      }, 150);
    });
};

export const login = ({ email, password }) => (dispatch, getState, { getFirebase }) => {
  const errorElement = document.querySelector('.form__registrationErrorHandler');

  getFirebase()
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      errorElement.innerText = '';
    })
    .catch(({ message }) => {
      errorElement.innerText = '';
      setTimeout(() => {
        errorElement.innerText = message;
      }, 150);
    });
};

export const logout = () => (dispatch, getState, { getFirebase }) => {
  getFirebase()
    .auth()
    .signOut()
    .catch(err => window.alert(err));
};
