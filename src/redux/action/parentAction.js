import {
  CREATE_PARENT,
  GET_ALL_PARENT,
  GET_ONE_PARENT,
  DELETE_PARENT,
  UPDATE_PARENT,
  GET_ERROR,
} from '../type';
import useGetData from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInserData';
import useDeleteData from './../../hooks/useDeleteData';
import { useUpdateDataWithImage } from '../../hooks/useUpdateData';

// get all parents

export const getAllParent = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/parent/getall');

    dispatch({
      type: GET_ALL_PARENT,
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
export const createParent = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      `/api/parent/store`,
      formData
    );
    console.log(response);
    dispatch({
      type: CREATE_PARENT,
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
export const getOneParent = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`api/parent/show/${id}`);

    dispatch({
      type: GET_ONE_PARENT,
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
export const deleteParent = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/parent/delete/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_PARENT,
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
export const updateParent = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/parent/update/${id}`,
      data
    );

    dispatch({
      type: UPDATE_PARENT,
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
