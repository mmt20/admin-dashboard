import './style/studentProfile.scss';
import List from '../../components/table/Table';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import QrCode from '../../components/qrCode/QrCode';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneStudentWithParent } from '../../redux/action/studentAction';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const StudentProfile = () => {
  const url = window.location.href;
  const segments = url.split('/');
  const driversIndex = segments.findIndex((segment) => segment === 'students');
  const id = segments[driversIndex + 1];

  // REDUX
  const dispatch = useDispatch();
  const student = useSelector((state) => state.allStudents.oneStudent);
  const loading = useSelector((state) => state.allStudents.loading);
  console.log(student);
  useEffect(() => {
    dispatch(getOneStudentWithParent(id));
  }, [dispatch, id]);
  console.log(student);
  return (
    <div className="student">
      <Sidebar />
      <div className="studentContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {student ? (
              <Link
                to={`/students/editStudent/${student.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              <CircularProgress size={24} />
            )}
            <h1 className="title">Student Information</h1>

            {loading === true ? (
              <Loader />
            ) : student && Object.keys(student).length > 0 ? (
              <div className="student">
                <img
                  src={student['Student Image']}
                  alt="avatar"
                  className="studentImage"
                />
                <div className="details">
                  <div className="studentTitle">{student.Student_Name}</div>
                  <div className="detailItem">
                    <span className="studentKey">Parent:</span>
                    <span className="studentValue">{student.parentName}</span>
                  </div>
                  <div className="detailItem">
                    <span className="studentKey">Grade:</span>
                    <span className="studentValue">{student.grade}</span>
                  </div>
                  <div className="detailItem">
                    <span className="studentKey">Class:</span>
                    <span className="studentValue">{student.class}</span>
                  </div>
                </div>
              </div>
            ) : (
              <h4 className="no-data">NO DATA FOUND</h4>
            )}
          </div>
          <div className="right">
            <h1 className="titleQrCode">Student QrCode</h1>

            <div>
              <QrCode studentID={student.ID} stName={student.Student_Name} />
            </div>
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Kid (Status)</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
