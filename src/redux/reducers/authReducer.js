import { LOGIN_ADMIN, LOGOUT_ADMIN } from '../type';

const inital = {
  loginAdmin: [],
  logoutAdmin: [],
  loading: true,
};
const authReducer = (state = inital, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        loginAdmin: action.payload,
      };
    case LOGOUT_ADMIN:
      return {
        ...state,
        logoutAdmin: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
