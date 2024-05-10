import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import notify from '../../hook/useNotifaction';
import {
  getAllSupervisor,
  getOneSupervisor,
  updateSupervisor,
} from '../../redux/action/supervisorAction';
const EditSupervisorHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSupervisor(id));
  }, [dispatch, id]);

  const oneSupervisor = useSelector(
    (state) => state.allSupervisors.oneSupervisor
  );

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  useEffect(() => {
    if (oneSupervisor && oneSupervisor.data) {
      setFile(oneSupervisor.data['Supervisor Image']);

      setFormData({
        fullName: oneSupervisor.data['Supervisor Name'],
        email: oneSupervisor.data.Email,
        phone: oneSupervisor.data.Phone,
        address: oneSupervisor.data.Address,
      });
    }
  }, [oneSupervisor]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const res = useSelector(
    (state) => state.allSupervisors.updateSupervisors.data
  );

  // save data in database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, address } = formData;
    if (!fullName || !email || !phone || !address || !file) {
      notify('Please Insert All Data', 'warn');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('Image', file);
    formDataToSend.append('Full_Name', formData.fullName);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phone);
    formDataToSend.append('Password', formData.password || null);
    formDataToSend.append('Address', formData.address);
    formDataToSend.append('location', 'slcasjlsafl');

    await dispatch(updateSupervisor(id, formDataToSend));
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
        notify('Supervisor Data Modified successfully', 'success');
        dispatch(getAllSupervisor());
      } else {
        notify('There is a Problem on Modify Supervisor', 'error');
      }
    }
  }, [loading, res, dispatch]);

  return [file, formData, handleChange, handleFileChange, handleSubmit];
};

export default EditSupervisorHook;
