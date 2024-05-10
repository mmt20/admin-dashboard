import {
  CREATE_PARENT,
  GET_ALL_PARENT,
  GET_ONE_PARENT,
  DELETE_PARENT,
  UPDATE_PARENT,
  GET_ERROR,
} from '../type';

const inital = {
  parent: [],
  oneParent: [],
  deleteParents: [],
  updateParents: [],
  loading: true,
};

const parentReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_PARENT:
      return { ...state, parent: action.payload, loading: false };
    case GET_ONE_PARENT:
      return {
        ...state,
        oneParent: action.payload,
        loading: false,
      };
    case CREATE_PARENT:
      return { parent: action.payload, loading: false };
    case DELETE_PARENT:
      return {
        ...state,
        deleteParents: action.payload,
        loading: false,
      };
    case UPDATE_PARENT:
      return {
        ...state,
        updateParents: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return { parent: action.payload, loading: true };
    default:
      return state;
  }
};

export default parentReducer;
