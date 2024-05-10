import {
  GET_ALL_STUDENT_WITH_PARENT,
  CREATE_STUDENT,
  GET_ALL_STUDENT,
  GET_ONE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  GET_ERROR,
} from '../type';

const inital = {
  student: [],
  oneStudent: [],
  deleteStudents: [],
  updateStudents: [],
  loading: true,
};

const studentReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_STUDENT:
      return { ...state, student: action.payload, loading: false };
    case GET_ALL_STUDENT_WITH_PARENT:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case GET_ONE_STUDENT:
      return {
        ...state,
        oneStudent: action.payload,
        loading: false,
      };
    case CREATE_STUDENT:
      return {
        student: action.payload,
        loading: false,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        deleteStudents: action.payload,
        loading: false,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        updateStudents: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return { student: action.payload, loading: true };
    default:
      return state;
  }
};

export default studentReducer;
