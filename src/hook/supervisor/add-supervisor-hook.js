import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import notify from '../../hook/useNotifaction';
import {
  createSupervisor,
  getAllSupervisor,
} from '../../redux/action/supervisorAction';
const AddSupervisorHook = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const res = useSelector((state) => state.allSupervisors.supervisor);

  // save data in database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, password, address } = formData;
    if (!fullName || !email || !phone || !password || !address || !file) {
      notify('Please Insert All Data', 'warn');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('Image', file);
    formDataToSend.append('Full_Name', formData.fullName);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phone);
    formDataToSend.append('Password', formData.password);
    formDataToSend.append('Address', formData.address);
    formDataToSend.append('location', 'slcasjlsafl');

    await dispatch(createSupervisor(formDataToSend));
    setLoading(false);
  };
  useEffect(() => {
    if (!loading) {
      setFile(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        address: '',
      });
      setLoading(true);
      if (res.status === 201) {
        notify('Supervisor Successfully Stored', 'success');
        dispatch(getAllSupervisor());
      } else {
        notify('There is a Problem on Add New Supervisor', 'error');
      }
    }
  }, [loading, res.status, dispatch]);

  return [file, formData, handleChange, handleFileChange, handleSubmit];
};

export default AddSupervisorHook;
