import './style/supervisorProfile.scss';
import Sidebar from './../../components/sidebar/Sidebar';
import Navbar from './../../components/navbar/Navbar';
import Chart from './../../components/chart/Chart';
import List from '../../components/table/Table';
import ViewSupervisorProfileHook from '../../hook/supervisor/view-supervisor-profile-hook';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const SupervisorProfile = () => {
  const [supervisor, loading] = ViewSupervisorProfileHook();
  console.log('supervisor', supervisor);
  return (
    <div className="supervisor">
      <Sidebar />
      <div className="supervisorContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {supervisor.data ? (
              <Link
                to={`/supervisors/editSupervisor/${supervisor.data.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              <CircularProgress size={24} />
            )}
            <h1 className="title">Supervisor Information</h1>
            {loading === true ? (
              <Loader />
            ) : supervisor && Object.keys(supervisor).length > 0 ? (
              <div className="supervisor">
                <img
                  src={supervisor.data['Supervisor Image']}
                  alt="avatar"
                  className="supervisorImage"
                />
                <div className="details">
                  <div className="supervisorTitle">
                    {supervisor.data['Supervisor Name']}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{supervisor.data.Email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="supervisorKey">Phone:</span>
                    <span className="supervisorValue">
                      {supervisor.data.Phone}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="supervisorKey">Address:</span>
                    <span className="supervisorValue">
                      {supervisor.data.Address}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="supervisorKey">Country:</span>
                    <span className="supervisorValue">Egypt</span>
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
              title="Total Kids Supervised (Last 6 Months)"
            />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Kids Supervised (Status)</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;
