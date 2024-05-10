import {
  CREATE_DRIVER,
  GET_ALL_DRIVERS,
  GET_ONE_DRIVER,
  DELETE_DRIVER,
  UPDATE_DRIVER,
  GET_ERROR,
} from '../type';
import useGetData from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInserData';
import useDeleteData from './../../hooks/useDeleteData';
import { useUpdateDataWithImage } from '../../hooks/useUpdateData';

// get all drivers
export const getAllDriver = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/driver/getall');
    dispatch({
      type: GET_ALL_DRIVERS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

// create new driver
export const createDriver = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      `/api/driver/store`,
      formData
    );
    dispatch({
      type: CREATE_DRIVER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

//get one driver with id
export const getOneDriver = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`api/driver/show/${id}`);

    dispatch({
      type: GET_ONE_DRIVER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//delete driver with id
export const deleteDriver = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/driver/delete/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_DRIVER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//update driver with id
export const updateDriver = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/driver/update/${id}`,
      data
    );

    dispatch({
      type: UPDATE_DRIVER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};
