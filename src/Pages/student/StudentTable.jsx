import './style/studentTable.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { studentColumns } from '../../datatablesource';

import DatatableWithImage from '../../components/datatableWithImage/DatatableWithImage';
import Loader from '../../components/Loader/Loader';
import AllStudentHook from '../../hook/student/all-student-table-hook';

const StudentTable = () => {
  const [students, loading] = AllStudentHook();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading === true ? (
          <Loader />
        ) : (
          <DatatableWithImage
            rows={students}
            coloum={studentColumns}
            type="students"
          />
        )}
      </div>
    </div>
  );
};

export default StudentTable;
