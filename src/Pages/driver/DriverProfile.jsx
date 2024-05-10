import './style/driverProfile.scss';
import Sidebar from './../../components/sidebar/Sidebar';
import Navbar from './../../components/navbar/Navbar';
import Chart from './../../components/chart/Chart';
import List from '../../components/table/Table';

import Loader from '../../components/Loader/Loader';
import ViewDriverProfileHook from '../../hook/driver/view-driver-profile-hook';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const DriverProfile = () => {
  const [driver, loading] = ViewDriverProfileHook();

  return (
    <div className="driver">
      <Sidebar />
      <div className="driverContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {driver.data ? (
              <Link
                to={`/drivers/editDriver/${driver.data.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              <CircularProgress size={24} />
            )}
            <h1 className="title">Driver Information</h1>
            {loading ? (
              <Loader />
            ) : driver && Object.keys(driver).length > 0 ? (
              <div className="driver">
                <img
                  src={driver.data['Driver Image']}
                  alt="avatar"
                  className="driverImage"
                />
                <div className="details">
                  <div className="driverTitle">
                    {driver.data['Driver Name']}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{driver.data.Email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{driver.data.Phone}</span>
                  </div>
                </div>
              </div>
            ) : (
              <h4 className="no-data">NO DATA FOUND</h4>
            )}
          </div>
          <div className="right">
            <Chart
              aspect={3 / 1}
              title="Total Kids Transported  (Last 6 Months)"
            />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Kids Transported (Status)</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
