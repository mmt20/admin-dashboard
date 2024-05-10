import { useEffect, useState } from 'react';
import { getAllParent } from '../../redux/action/parentAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
import notify from './../../hook/useNotifaction';
import {
  createStudent,
  getAllStudentWithParent,
} from '../../redux/action/studentAction';
const AddStudentHook = () => {
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    stClass: '',
    parent: '',
    supervisor: '',
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllParent());
    dispatch(getAllSupervisor());
  }, [dispatch]);

  const parents = useSelector((state) => state.allParents.parent.data);
  const loadingParent = useSelector((state) => state.allParents.loading);

  const supervisors = useSelector(
    (state) => state.allSupervisors.supervisor.data
  );
  const loadingSupervisor = useSelector(
    (state) => state.allSupervisors.loading
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentName, grade, stClass, parent, supervisor } = formData;
    if (!studentName || !grade || !stClass || !parent || !supervisor || !file) {
      notify('Please Insert All Data', 'warn');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('Image', file);
    formDataToSend.append('FullName', studentName);
    formDataToSend.append('Parent_ID', parent);
    formDataToSend.append('Supervisor_ID', supervisor);
    formDataToSend.append('class', stClass);
    formDataToSend.append('grade', grade);
    await dispatch(createStudent(formDataToSend));
    setLoading(false);
  };
  const res = useSelector((state) => state.allStudents.student);
  useEffect(() => {
    if (!loading) {
      setFile(null);
      setFormData({
        studentName: '',
        grade: '',
        stClass: '',
        parent: '',
        supervisor: '',
      });
      setLoading(true);
      if (res.status === 201) {
        dispatch(getAllStudentWithParent());
        notify('Student Successfully Stored', 'success');
      } else {
        notify('There is a Problem on Add New Student', 'error');
      }
    }
  }, [loading, res.status, dispatch]);
  return [
    file,
    formData,
    handleChange,
    handleSubmit,
    setFile,
    parents,
    supervisors,
    loadingParent,
    loadingSupervisor,
  ];
};

export default AddStudentHook;
