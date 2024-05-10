import './style/parentTable.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { userColumns } from '../../datatablesource';
import DatatableWithImage from './../../components/datatableWithImage/DatatableWithImage';
import Loader from '../../components/Loader/Loader';
import AllParentHook from './../../hook/parent/all-parent-table-hook';

const ParentTable = () => {
  const [parents, loading] = AllParentHook();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading === true ? (
          <Loader />
        ) : (
          <DatatableWithImage
            rows={parents}
            coloum={userColumns}
            type="parents"
          />
        )}
      </div>
    </div>
  );
};

export default ParentTable;
