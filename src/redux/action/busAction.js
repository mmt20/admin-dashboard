import {
  GET_ALL_BUSES,
  CREATE_BUS,
  DELETE_BUS,
  GET_ERROR,
  GET_ONE_BUS,
  UPDATE_BUS,
} from '../type';
import useGetData from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInserData';
import useDeleteData from './../../hooks/useDeleteData';
import { useUpdateData } from '../../hooks/useUpdateData';

// get all buses
export const getAllBuses = () => async (dispatch) => {
  try {
    const response = await useGetData('/api/buses/getall');
    dispatch({
      type: GET_ALL_BUSES,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

// create new bus
export const createBus = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/buses/store`, formData);
    console.log(response);
    dispatch({
      type: CREATE_BUS,
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

// get all buses with supervisor and driver names
export const getAllBusesWithNames = () => async (dispatch) => {
  try {
    const busResponse = await useGetData('/api/buses/getall');
    const busesWithNames = await Promise.all(
      busResponse.data.map(async (bus) => {
        const supervisorResponse = await useGetData(
          `/api/SV/show/${bus.Bus_Supervisor_ID}`
        );
        const driverResponse = await useGetData(
          `/api/driver/show/${bus.Bus_Driver_ID}`
        );
        return {
          ...bus,
          supervisorName: supervisorResponse.data['Supervisor Name'],
          driverName: driverResponse.data['Driver Name'],
        };
      })
    );

    dispatch({
      type: GET_ALL_BUSES,
      payload: busesWithNames,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};

//delete driver with id
export const deleteBus = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/buses/delete/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_BUS,
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
// get one bus by id
export const getOneBus = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/buses/show/${id}`);
    dispatch({
      type: GET_ONE_BUS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};
// get one bus by id with supervisor and driver names
export const getOneBusWithNames = (id) => async (dispatch) => {
  try {
    const busResponse = await useGetData(`/api/buses/show/${id}`);

    if (busResponse && busResponse.data && busResponse.data.length > 0) {
      const busData = busResponse.data[0];
      const supervisorResponse = await useGetData(
        `/api/SV/show/${busData.Bus_Supervisor_ID}`
      );
      const driverResponse = await useGetData(
        `/api/driver/show/${busData.Bus_Driver_ID}`
      );

      const busWithNames = {
        ...busData,
        supervisorName: supervisorResponse.data['Supervisor Name'],
        driverName: driverResponse.data['Driver Name'],
      };
      console.log('busWithNames', busWithNames);
      dispatch({
        type: GET_ONE_BUS,
        payload: busWithNames,
      });
    } else {
      dispatch({
        type: GET_ERROR,
        payload: 'Error: No data received for bus ID ' + id,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error => ' + e,
    });
  }
};
//update parents with id
export const updateBus = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/buses/update/${id}`, data);

    dispatch({
      type: UPDATE_BUS,
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
