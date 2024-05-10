import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { supervisorColumns } from '../../datatablesource';

import DatatableWithImage from '../../components/datatableWithImage/DatatableWithImage';
import Loader from '../../components/Loader/Loader';
import AllSupervisorHook from '../../hook/supervisor/all-supervisor-table-hook';

const SupervisorTable = () => {
  const [supervisor, loading] = AllSupervisorHook();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading === true ? (
          <Loader />
        ) : supervisor ? (
          <DatatableWithImage
            rows={supervisor}
            coloum={supervisorColumns}
            type="supervisors"
          />
        ) : (
          <p>No parent data available</p>
        )}
      </div>
    </div>
  );
};

export default SupervisorTable;
