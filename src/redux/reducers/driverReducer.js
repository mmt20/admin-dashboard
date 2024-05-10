import {
  GET_ALL_DRIVERS,
  GET_ERROR,
  CREATE_DRIVER,
  GET_ONE_DRIVER,
  UPDATE_DRIVER,
  DELETE_DRIVER,
} from '../type';

const inital = {
  driver: [],
  oneDriver: [],
  deleteDrivers: [],
  updateDrivers: [],
  loading: true,
};

const driverReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_DRIVERS:
      return { ...state, driver: action.payload, loading: false };
    case GET_ONE_DRIVER:
      return {
        ...state,
        oneDriver: action.payload,
        loading: false,
      };
    case CREATE_DRIVER:
      return {
        driver: action.payload,
        loading: false,
      };
    case DELETE_DRIVER:
      return {
        ...state,
        deleteDrivers: action.payload,
        loading: false,
      };
    case UPDATE_DRIVER:
      return {
        ...state,
        updateDrivers: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return { driver: action.payload, loading: true };
    default:
      return state;
  }
};

export default driverReducer;
