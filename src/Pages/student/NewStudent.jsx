import './style/newStudent.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { MenuItem, TextField, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AddStudentHook from '../../hook/student/add-student-hook';

const NewStudent = () => {
  const [
    file,
    formData,
    handleChange,
    handleSubmit,
    setFile,
    parents,
    supervisors,
    loadingParent,
    loadingSupervisor,
  ] = AddStudentHook();

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Student</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="fromInput">
                <label>Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  placeholder="Mohamed"
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label>Parent</label>
                <TextField
                  className="textField"
                  id="parent-select"
                  variant="standard"
                  name="parent"
                  value={formData.parent}
                  select
                  onChange={handleChange}
                >
                  {loadingParent ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    parents &&
                    parents.map((parent) => (
                      <MenuItem key={parent.ID} value={parent.ID}>
                        {parent.Parent_Name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </div>
              <div className="fromInput">
                <label>Supervisor</label>
                <TextField
                  className="textField"
                  id="supervisor-select"
                  variant="standard"
                  name="supervisor"
                  value={formData.supervisor}
                  select
                  onChange={handleChange}
                >
                  {loadingSupervisor ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    supervisors &&
                    supervisors.map((supervisor) => (
                      <MenuItem key={supervisor.ID} value={supervisor.ID}>
                        {supervisor['Supervisor Name']}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </div>
              <div className="fromInput">
                <label>Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  placeholder="Five"
                  onChange={handleChange}
                />
              </div>
              <div className="fromInput">
                <label>Class</label>
                <input
                  type="text"
                  name="stClass"
                  value={formData.stClass}
                  placeholder="A"
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

export default NewStudent;
