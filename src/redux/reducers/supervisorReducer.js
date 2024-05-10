import {
  CREATE_SUPERVISOR,
  GET_ALL_SUPERVISOR,
  GET_ONE_SUPERVISOR,
  DELETE_SUPERVISOR,
  UPDATE_SUPERVISOR,
  GET_ERROR,
} from '../type';

const inital = {
  supervisor: [],
  oneSupervisor: [],
  deleteSupervisors: [],
  updateSupervisors: [],
  loading: true,
};

const supervisorReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_SUPERVISOR:
      return { ...state, supervisor: action.payload, loading: false };
    case GET_ONE_SUPERVISOR:
      return {
        ...state,
        oneSupervisor: action.payload,
        loading: false,
      };
    case CREATE_SUPERVISOR:
      return {
        supervisor: action.payload,
        loading: false,
      };
    case DELETE_SUPERVISOR:
      return {
        ...state,
        deleteSupervisors: action.payload,
        loading: false,
      };
    case UPDATE_SUPERVISOR:
      return {
        ...state,
        updateSupervisors: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return { supervisor: action.payload, loading: true };
    default:
      return state;
  }
};

export default supervisorReducer;
