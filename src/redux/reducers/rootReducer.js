import { combineReducers } from 'redux';
import driverReducer from './driverReducer';
import busReducer from './busReducer';
import parentReducer from './parentReducer';
import supervisorReducer from './supervisorReducer';
import studentReducer from './studentReducer';
import authReducer from './authReducer';

export default combineReducers({
  allParents: parentReducer,
  allSupervisors: supervisorReducer,
  allStudents: studentReducer,
  allDrivers: driverReducer,
  allBuses: busReducer,
  authReducer: authReducer,
});
