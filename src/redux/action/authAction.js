import {
  useInsertData,
  useInsertDataWithImage,
} from '../../hooks/useInserData';
import { LOGIN_ADMIN, LOGOUT_ADMIN } from '../type';

//login  user
export const loginAdmin = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/auth/login`, data);
    dispatch({
      type: LOGIN_ADMIN,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_ADMIN,
      payload: e.response,
    });
  }
};

//logout  user
export const logoutAdmin = () => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/auth/logout`);
    dispatch({
      type: LOGOUT_ADMIN,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGOUT_ADMIN,
      payload: e.response,
    });
  }
};
