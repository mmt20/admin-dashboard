import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllParent } from '../../redux/action/parentAction';
const AllParentHook = () => {
  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllParent());
  }, [dispatch]);
  const parents = useSelector((state) => state.allParents.parent.data);
  const loading = useSelector((state) => state.allParents.loading);

  return [parents, loading];
};

export default AllParentHook;
