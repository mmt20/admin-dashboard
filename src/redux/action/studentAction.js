import {
  GET_ALL_STUDENT_WITH_PARENT,
  CREATE_STUDENT,
  GET_ALL_STUDENT,
  GET_ONE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  GET_ERROR,
} from '../type';
import useGetData from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInserData';
import useDeleteData from './../../hooks/useDeleteData';
import { useUpdateDataWithImage } from '../../hooks/useUpdateData';

// get all Students
export const getAllStudent = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/student/getall');
    dispatch({
      type: GET_ALL_STUDENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};
// get all Students with parent
export const getAllStudentWithParent = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/student/getall');

    // Fetch parent data for each student and add parent name to student object
    const studentsWithParent = await Promise.all(
      response.data.map(async (student) => {
        const parentResponse = await useGetData(
          `/api/parent/show/${student.Parent_ID}`
        );
        const parentName = parentResponse.data.Parent_Name;
        return { ...student, parentName }; // Add parentName to student object
      })
    );
    console.log('studentsWithParent', studentsWithParent);
    dispatch({
      type: GET_ALL_STUDENT_WITH_PARENT,
      payload: studentsWithParent,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

// create new Student
export const createStudent = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      `/api/student/store`,
      formData
    );

    dispatch({
      type: CREATE_STUDENT,
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

//get one Student with id
export const getOneStudent = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`api/student/show/${id}`);

    dispatch({
      type: GET_ONE_STUDENT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//delete prooduct with id
export const deleteStudent = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/student/delete/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_STUDENT,
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

// Get one Student with parent
export const getOneStudentWithParent = (id) => async (dispatch) => {
  try {
    const studentResponse = await useGetData(`/api/student/show/${id}`);
    const student = studentResponse.data;

    const parentResponse = await useGetData(
      `/api/parent/show/${student.Parent_ID}`
    );
    const parentName = parentResponse.data.Parent_Name;

    const studentWithParent = { ...student, parentName };

    dispatch({
      type: GET_ONE_STUDENT,
      payload: studentWithParent,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// Get one Student with parent
export const getOneStudentWithAllNames = (id) => async (dispatch) => {
  try {
    const studentResponse = await useGetData(`/api/student/show/${id}`);
    const student = studentResponse.data;

    const parentResponse = await useGetData(
      `/api/parent/show/${student.Parent_ID}`
    );
    const supervisorResponse = await useGetData(
      `/api/SV/show/${student.Parent_ID}`
    );
    const parentName = parentResponse.data.Parent_Name;
    const SupervisorName = supervisorResponse.data.Supervisor_Name;

    const studentWithParent = { ...student, parentName, SupervisorName };

    dispatch({
      type: GET_ONE_STUDENT,
      payload: studentWithParent,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//update student with id
export const updateStudent = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/student/update/${id}`,
      data
    );

    dispatch({
      type: UPDATE_STUDENT,
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
