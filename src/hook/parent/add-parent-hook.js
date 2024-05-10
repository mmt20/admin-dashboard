import { createParent, getAllParent } from '../../redux/action/parentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import notify from '../../hook/useNotifaction';
const AddParentHook = () => {
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

  const res = useSelector((state) => state.allParents.parent);
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
    formDataToSend.append('address', formData.address);
    await dispatch(createParent(formDataToSend));
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
        dispatch(getAllParent());
        notify('Parent Successfully Stored', 'success');
      } else {
        notify('There is a Problem on Add New Parent', 'error');
      }
    }
  }, [loading, res.status, dispatch]);

  return [
    file,
    formData,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  ];
};

export default AddParentHook;
