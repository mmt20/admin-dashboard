import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBusesWithNames } from '../../redux/action/busAction';

export const AllBusHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBusesWithNames());
  }, [dispatch]);

  const buses = useSelector((state) => state.allBuses.bus);
  const loading = useSelector((state) => state.allBuses.loading);
  return [buses, loading];
};
