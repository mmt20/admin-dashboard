import {
  GET_ALL_BUSES,
  CREATE_BUS,
  GET_ERROR,
  GET_ONE_BUS,
  UPDATE_BUS,
} from '../type';

const inital = {
  bus: [],
  oneBus: [],
  updateBus: [],
  loading: true,
};

const busReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_BUSES:
      return { ...state, bus: action.payload, loading: false };
    case CREATE_BUS:
      return { bus: action.payload, loading: false };
    case GET_ONE_BUS:
      return { ...state, oneBus: action.payload, loading: false };
    case UPDATE_BUS:
      return {
        ...state,
        updateBus: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return { bus: action.payload, loading: true };
    default:
      return state;
  }
};

export default busReducer;
