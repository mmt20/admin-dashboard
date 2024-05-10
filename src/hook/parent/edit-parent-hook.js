import {
  getAllParent,
  getOneParent,
  updateParent,
} from '../../redux/action/parentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import notify from '../../hook/useNotifaction';
const EditParentHook = (id) => {
  // REDUX

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneParent(id));
  }, [dispatch, id]);
  const oneParent = useSelector((state) => state.allParents.oneParent);
  console.log(oneParent);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });
  useEffect(() => {
    if (oneParent && oneParent.data) {
      const { Parent_Name, Email, Phone, address, Image } = oneParent.data;
      setFile(Image);
      setFormData({
        fullName: Parent_Name,
        email: Email,
        phone: Phone,
        address: address,
      });
    }
  }, [oneParent]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const res = useSelector((state) => state.allParents.updateParents.data);
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
    formDataToSend.append('address', formData.address);
    await dispatch(updateParent(id, formDataToSend));
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
      console.log('res', res);
      if (res.message === 'Parent updated successfully') {
        dispatch(getAllParent());
        notify('Parent Data Modified successfully', 'success');
      } else {
        notify('There is a Problem on Modify Parent', 'error');
      }
    }
  }, [loading, dispatch, res]);

  return [
    file,
    formData,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  ];
};

export default EditParentHook;
