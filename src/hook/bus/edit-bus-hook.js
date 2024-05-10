import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDriver } from '../../redux/action/driverAction';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
import notify from '../../hook/useNotifaction';
import {
  getAllBusesWithNames,
  getOneBusWithNames,
  updateBus,
} from '../../redux/action/busAction';
const EditBusHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      try {
        await dispatch(getOneBusWithNames(id));
        await dispatch(getAllDriver());
        await dispatch(getAllSupervisor());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [dispatch, id]);
  const oneBus = useSelector((state) => state.allBuses.oneBus);

  const drivers = useSelector((state) => state.allDrivers.driver.data);
  const loadingDrivers = useSelector((state) => state.allDrivers.loading);

  const supervisors = useSelector(
    (state) => state.allSupervisors.supervisor.data
  );
  const loadingSupervisors = useSelector(
    (state) => state.allSupervisors.loading
  );
  const [formData, setFormData] = useState({
    busNumber: '',
    busLine: '',
    driver: '',
    supervisor: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (oneBus) {
          const {
            Bus_License,
            Bus_Line_Name,
            Bus_Driver_ID,
            Bus_Supervisor_ID,
          } = oneBus;

          setFormData({
            busNumber: Bus_License,
            busLine: Bus_Line_Name,
            driver: Bus_Driver_ID,
            supervisor: Bus_Supervisor_ID,
          });
        }
      } catch (error) {
        console.error('Error setting form data:', error);
      }
    };

    fetchData();
  }, [oneBus]);

  const [loading, setLoading] = useState(true);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { busNumber, busLine, driver, supervisor } = formData;
    if (!busNumber || !busLine || !driver || !supervisor) {
      notify('Please Insert All Data', 'warn');
      return;
    }

    setLoading(true);
    const formDataToSend = {
      Bus_License: busNumber,
      Bus_Line_Name: busLine,
      Bus_Driver_ID: driver,
      Bus_Supervisor_ID: supervisor,
    };
    await dispatch(updateBus(id, formDataToSend));
    setFormData({
      busNumber: '',
      busLine: '',
      driver: '',
      supervisor: '',
    });
    setLoading(false);
  };
  const res = useSelector((state) => state.allBuses.updateBus.data);

  useEffect(() => {
    if (!loading) {
      setFormData({
        busNumber: '',
        busLine: '',
        driver: '',
        supervisor: '',
      });
      setLoading(true);
      if (res.status === 201) {
        notify('Bus Data Modified successfully', 'success');
        dispatch(getAllBusesWithNames());
      } else {
        notify('There is a Problem on Modify Bus', 'error');
      }
    }
  }, [loading, dispatch, res]);
  return [
    formData,
    drivers,
    loadingDrivers,
    supervisors,
    loadingSupervisors,
    handleInputChange,
    handleSubmit,
  ];
};

export default EditBusHook;
