import {
  CREATE_SUPERVISOR,
  GET_ALL_SUPERVISOR,
  GET_ONE_SUPERVISOR,
  DELETE_SUPERVISOR,
  UPDATE_SUPERVISOR,
  GET_ERROR,
} from '../type';
import useGetData from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInserData';
import useDeleteData from './../../hooks/useDeleteData';
import { useUpdateDataWithImage } from '../../hooks/useUpdateData';

// get all supervisor
//Supervisor
export const getAllSupervisor = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/SV/getall');

    dispatch({
      type: GET_ALL_SUPERVISOR,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

// create new parents
export const createSupervisor = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/SV/store`, formData);
    console.log('createSupervisor response => ', response);
    dispatch({
      type: CREATE_SUPERVISOR,
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

//get one parents with id
export const getOneSupervisor = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`api/SV/show/${id}`);

    dispatch({
      type: GET_ONE_SUPERVISOR,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//delete parents with id
export const deleteSupervisor = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/SV/delete/${id}`);

    dispatch({
      type: DELETE_SUPERVISOR,
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
//update parents with id
export const updateSupervisor = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(`/api/SV/update/${id}`, data);

    dispatch({
      type: UPDATE_SUPERVISOR,
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
