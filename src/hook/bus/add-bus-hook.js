import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDriver } from '../../redux/action/driverAction';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
import notify from '../../hook/useNotifaction';
import { createBus, getAllBusesWithNames } from '../../redux/action/busAction';
const AddBusHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDriver());
    dispatch(getAllSupervisor());
  }, [dispatch]);
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
    console.log('formData', formData);
    setLoading(true);
    const formDataToSend = {
      Bus_License: busNumber,
      Bus_Line_Name: busLine,
      Bus_Driver_ID: driver,
      Bus_Supervisor_ID: supervisor,
    };
    await dispatch(createBus(formDataToSend));
    setFormData({
      busNumber: '',
      busLine: '',
      driver: '',
      supervisor: '',
    });
    setLoading(false);
  };

  const res = useSelector((state) => state.allBuses.bus);
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
        notify('Bus Successfully Added', 'success');
        dispatch(getAllBusesWithNames());
      } else {
        notify('There is a Problem Adding New Bus', 'error');
      }
    }
  }, [loading, dispatch, res.status]);
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

export default AddBusHook;
