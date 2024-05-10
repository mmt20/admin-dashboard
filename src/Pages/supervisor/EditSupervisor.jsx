import './style/newSupervisor.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

import { ToastContainer } from 'react-toastify';
import EditSupervisorHook from '../../hook/supervisor/edit-supervisor-hook';

const EditSupervisor = () => {
  const currentURL = window.location.href;
  const id = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  const [file, formData, handleChange, handleFileChange, handleSubmit] =
    EditSupervisorHook(id);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Supervisor Information </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? file
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt="avatar"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="fromInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="fromInput">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Mostafa Mohamed"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="mm_taha@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="+20 111 421 6518"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Dayr Mawas St. 216 Bani Omran"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditSupervisor;
