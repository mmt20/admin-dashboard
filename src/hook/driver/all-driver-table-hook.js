import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDriver } from '../../redux/action/driverAction';
const AllDriverHook = () => {
  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDriver());
  }, [dispatch]);
  const drivers = useSelector((state) => state.allDrivers.driver.data);
  const loading = useSelector((state) => state.allDrivers.loading);

  return [drivers, loading];
};

export default AllDriverHook;
