import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudentWithParent } from '../../redux/action/studentAction';
const AllStudentHook = () => {
  // REDUX
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudentWithParent());
  }, [dispatch]);
  const students = useSelector((state) => state.allStudents.students);
  let loading = useSelector((state) => state.allStudents.loading);

  return [students, loading];
};

export default AllStudentHook;
