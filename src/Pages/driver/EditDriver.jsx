import './style/newDriver.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import EditDriverHook from '../../hook/driver/edit-driver-hook';

const EditDriver = () => {
  const currentURL = window.location.href;
  const id = currentURL.substring(currentURL.lastIndexOf('/') + 1);
  const [formData, file, handleFileChange, handleInputChange, handelSubmit] =
    EditDriverHook(id);
  console.log('formData', formData);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Driver Information</h1>
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
            <form onSubmit={handelSubmit}>
              <div className="fromInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="fromInput">
                <label>Full Name</label>
                <input
                  value={formData.fullName}
                  name="fullName"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Mostafa Mohamed"
                />
              </div>
              <div className="fromInput">
                <label>Email</label>
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                  type="mail"
                  placeholder="mm_taha@gmail.com"
                />
              </div>
              <div className="fromInput">
                <label>Phone</label>
                <input
                  value={formData.phone}
                  name="phone"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="+20 111 421 6518"
                  pattern="^01[0125][0-9]{8}$"
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

export default EditDriver;
