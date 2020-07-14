const initialState = { message: null };

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
      return { ...state, message: action.feedback, success: action.success };
    case 'AUTH_LOGIN_FAIL':
      return { ...state, message: action.feedback, success: action.success };
    default:
      return state;
  }
};
