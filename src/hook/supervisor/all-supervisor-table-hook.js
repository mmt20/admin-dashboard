import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
const AllSupervisorHook = () => {
  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('getAllSupervisor action dispatched');
    dispatch(getAllSupervisor());
  }, [dispatch]);
  const supervisor = useSelector(
    (state) => state.allSupervisors.supervisor.data
  );
  const loading = useSelector((state) => state.allSupervisors.loading);

  return [supervisor, loading];
};

export default AllSupervisorHook;
