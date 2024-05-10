import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneDriver } from '../../redux/action/driverAction';
const ViewDriverProfileHook = () => {
  const url = window.location.href;
  const segments = url.split('/');
  const driversIndex = segments.findIndex((segment) => segment === 'drivers');
  const id = segments[driversIndex + 1];

  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneDriver(id));
  }, [dispatch, id]);

  const driver = useSelector((state) => state.allDrivers.oneDriver);
  const loading = useSelector((state) => state.allDrivers.loading);

  return [driver, loading];
};

export default ViewDriverProfileHook;
