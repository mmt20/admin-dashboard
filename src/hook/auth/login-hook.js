import { useEffect, useState } from 'react';
import notify from './../useNotifaction';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from './../../redux/action/authAction';

const LoginHook = () => {
  const dispatch = useDispatch('');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPress(true);
    setLoading(true);
    dispatch(loginAdmin(email, password));
    await dispatch(
      loginAdmin({
        email,
        password,
      })
    );
    setLoading(false);
    setIsPress(false);
  };
  const res = useSelector((state) => state.authReducer.loginAdmin);
  useEffect(() => {
    if (!loading) {
      if (res) {
        console.log(res);
        if (res && res.access_token) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('admin', JSON.stringify(res.user));
          notify('Log in successfully', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else if (res && res.status === 422) {
          const firstErrorKey = Object.keys(res.data)[0];
          const errorMessage = res.data[firstErrorKey][0];
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          notify(errorMessage, 'error');
        } else if (res && res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          notify('incorrect password or email', 'error');
        }

        setLoading(true);
      }
    }
  }, [loading, res]);
  return [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    handleLogin,
    isPress,
  ];
};

export default LoginHook;
