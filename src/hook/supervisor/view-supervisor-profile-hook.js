import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneSupervisor } from '../../redux/action/supervisorAction';
const ViewSupervisorProfileHook = () => {
  const url = window.location.href;
  const segments = url.split('/');
  const driversIndex = segments.findIndex(
    (segment) => segment === 'supervisors'
  );
  const id = segments[driversIndex + 1];

  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneSupervisor(id));
  }, [dispatch, id]);

  const supervisor = useSelector((state) => state.allSupervisors.oneSupervisor);
  const loading = useSelector((state) => state.allSupervisors.loading);

  return [supervisor, loading];
};

export default ViewSupervisorProfileHook;
