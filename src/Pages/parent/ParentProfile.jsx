import './style/parentProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import Loader from '../../components/Loader/Loader';
import ViewParentProfileHook from '../../hook/parent/view-parent-profile-hook';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const ParentProfile = () => {
  const [parent, loading] = ViewParentProfileHook();
  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {parent.data ? (
              <Link
                to={`/parents/editParent/${parent.data.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              <CircularProgress size={24} />
            )}

            <h1 className="title">Information</h1>

            {loading === true ? (
              <Loader />
            ) : parent && Object.keys(parent).length > 0 ? (
              <div className="user">
                <img
                  src={parent.data.Image}
                  alt="avatar"
                  className="userImage"
                />
                <div className="details">
                  <div className="userTitle">{parent.data.Parent_Name}</div>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{parent.data.Email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="userKey">Phone:</span>
                    <span className="userValue">{parent.data.Phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="userKey">Address:</span>
                    <span className="userValue">{parent.data.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="userKey">Country:</span>
                    <span className="userValue">Egypt</span>
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
              title="User Kids Transactions (Last 6 Months)"
            />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Kids Transactions (Status)</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
