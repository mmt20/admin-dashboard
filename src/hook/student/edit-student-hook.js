import { useEffect, useState } from 'react';
import { getAllParent } from '../../redux/action/parentAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
import notify from './../../hook/useNotifaction';
import {
  getAllStudentWithParent,
  getOneStudentWithParent,
  updateStudent,
} from '../../redux/action/studentAction';
const EditStudentHook = (id) => {
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
    dispatch(getOneStudentWithParent(id));
    dispatch(getAllParent());
    dispatch(getAllSupervisor());
  }, [dispatch, id]);
  const OneStudent = useSelector((state) => state.allStudents.oneStudent);
  console.log('OneStudent', OneStudent);
  useEffect(() => {
    if (OneStudent) {
      setFile(OneStudent['Student Image']);
      setFormData({
        studentName: OneStudent.Student_Name,
        stClass: OneStudent.class,
        grade: OneStudent.grade,
        parent: OneStudent.Parent_ID,
        supervisor: OneStudent.Supervisor_ID,
      });
    }
  }, [OneStudent]);
  const parents = useSelector((state) => state.allParents.parent.data);
  const loadingParent = useSelector((state) => state.allParents.loading);

  const supervisors = useSelector(
    (state) => state.allSupervisors.supervisor.data
  );
  const loadingSupervisor = useSelector(
    (state) => state.allSupervisors.loading
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  // save update in database
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
    await dispatch(updateStudent(id, formDataToSend));
    setLoading(false);
  };
  const res = useSelector((state) => state.allStudents.updateStudents);
  console.log('res', res);
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
        notify('Student Data Modified successfully', 'success');
      } else {
        notify('There is a Problem on Modify Student', 'error');
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

export default EditStudentHook;
