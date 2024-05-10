import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDriver,
  getOneDriver,
  updateDriver,
} from '../../redux/action/driverAction';
import notify from '../useNotifaction';

const EditDriverHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneDriver(id));
  }, [dispatch, id]);
  const OneDriver = useSelector((state) => state.allDrivers.oneDriver);
  console.log(OneDriver);
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  useEffect(() => {
    if (OneDriver && OneDriver.data) {
      setFile(OneDriver.data['Driver Image']);
      //Driver Image
      setFormData({
        fullName: OneDriver.data['Driver Name'],
        email: OneDriver.data.Email,
        phone: OneDriver.data.Phone,
      });
    }
  }, [OneDriver]);
  const [loading, setLoading] = useState(true);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const res = useSelector((state) => state.allDrivers.updateDrivers);
  console.log('res', res);
  // save data in database
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone } = formData;
    if (fullName === '' || email === '' || phone === '' || file === '') {
      notify('Please Insert All Data', 'warn');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('Full_Name', fullName);
    formDataToSend.append('Email', email);
    formDataToSend.append('Phone', phone);
    formDataToSend.append('Image', file);
    await dispatch(updateDriver(id, formDataToSend));
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
        notify('Driver Data Modified successfully', 'success');
      } else {
        notify('There is a Problem on Modify Driver', 'error');
      }
    }
  }, [loading, res.status, dispatch]);

  return [formData, file, handleFileChange, handleInputChange, handelSubmit];
};

export default EditDriverHook;
