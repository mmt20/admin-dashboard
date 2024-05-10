import { getOneParent } from '../../redux/action/parentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const ViewParentProfileHook = () => {
  const url = window.location.href;
  const segments = url.split('/');
  const driversIndex = segments.findIndex((segment) => segment === 'parents');
  const id = segments[driversIndex + 1];

  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(id);
    dispatch(getOneParent(id));
  }, [dispatch, id]);

  const parent = useSelector((state) => state.allParents.oneParent);
  const loading = useSelector((state) => state.allParents.loading);

  return [parent, loading];
};

export default ViewParentProfileHook;
