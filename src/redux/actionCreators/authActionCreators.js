export const login = (email, password) => (dispatch, getState, { getFirebase }) =>
  getFirebase()
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // const history = useHistory();
      // errorElement.innerText = '';
      // successElement.innerText = 'Logging succeed.';
      dispatch({ type: 'AUTH_LOGIN_SUCCESS', feedback: 'LOGIN SUCCEED', success: true });
      // setTimeout(() => history.push('/dashboard'), 900);
    })
    .catch(({ message }) => {
      dispatch({ type: 'AUTH_LOGIN_FAIL', feedback: message, success: false });
      // const { message } = err;
      // errorElement.innerText = message;
    })
    .finally(() => getState());
