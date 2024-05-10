import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { Link, useLocation } from 'react-router-dom';
import { logoutAdmin } from '../../redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import notify from '../../hook/useNotifaction';
import { ToastContainer } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(logoutAdmin());
    setLoading(false);
  };
  const res = useSelector((state) => state.authReducer.logoutAdmin);

  useEffect(() => {
    if (!loading) {
      if ((res.message = 'User successfully signed out')) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        console.log('User successfully signed out');
        notify('successfully  signed out', 'success');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
      setLoading(true);
    }
  }, [loading, res]);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">school admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <DashboardIcon className="icon" />
              <span>Dashbord</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/parents" style={{ textDecoration: 'none' }}>
            <li className={location.pathname === '/parents' ? 'active' : ''}>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Parents</span>
            </li>
          </Link>
          <Link to="/supervisors" style={{ textDecoration: 'none' }}>
            <li
              className={location.pathname === '/supervisors' ? 'active' : ''}
            >
              <SupervisorAccountOutlinedIcon className="icon" />
              <span>Supervisors</span>
            </li>
          </Link>
          <Link to="/drivers" style={{ textDecoration: 'none' }}>
            <li className={location.pathname === '/drivers' ? 'active' : ''}>
              <Face6OutlinedIcon className="icon" />
              <span>Drivers</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: 'none' }}>
            <li className={location.pathname === '/students' ? 'active' : ''}>
              <ChildCareOutlinedIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/buses" style={{ textDecoration: 'none' }}>
            <li className={location.pathname === '/buses' ? 'active' : ''}>
              <DirectionsBusFilledOutlinedIcon className="icon" />
              <span>Buses</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <CampaignOutlinedIcon className="icon" />
            <span>Announcement</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <ToastContainer position="top-center" closeOnClick />
    </div>
  );
};

export default Sidebar;
