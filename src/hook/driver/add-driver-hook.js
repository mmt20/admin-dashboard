import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver, getAllDriver } from '../../redux/action/driverAction';
import notify from '../useNotifaction';

const AddDriverHook = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);

  const res = useSelector((state) => state.allDrivers.driver);
  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // save data in database
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    if (name === '' || email === '' || phone === '' || file === '') {
      notify('Please Insert All Data', 'warn');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('Full_Name', name);
    formDataToSend.append('Email', email);
    formDataToSend.append('Phone', phone);
    formDataToSend.append('Image', file);
    await dispatch(createDriver(formDataToSend));
    setLoading(false);
  };
  useEffect(() => {
    if (!loading) {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      setFile('');
      setLoading(true);
      if (res.status === 201) {
        dispatch(getAllDriver());
        notify('Driver Successfully Stored', 'success');
      } else {
        notify('There is a Problem on Add New Driver', 'error');
      }
    }
  }, [loading, res.status, dispatch]);

  return [formData, file, handleFileChange, handleInputChange, handelSubmit];
};

export default AddDriverHook;
