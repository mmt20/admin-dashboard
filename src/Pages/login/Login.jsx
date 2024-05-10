import './login.scss';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginHook from '../../hook/auth/login-hook';
import { CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
const Login = () => {
  const [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    handleLogin,
    isPress,
  ] = LoginHook();
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="header">
          <Person4OutlinedIcon className="icon" />
          <h2>Welcome</h2>
        </div>
        <div className="underline"></div>
        <div className="from-control">
          <EmailOutlinedIcon className="icon" />
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="email"
          ></input>
        </div>
        <div className="from-control">
          <LockOutlinedIcon className="icon" />
          <input
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="password"
          ></input>
        </div>

        <button type="submit">Login</button>
        {isPress ? loading ? <CircularProgress size={32} /> : null : null}
      </form>
      <ToastContainer position="top-center" closeOnClick />
    </div>
  );
};

export default Login;
