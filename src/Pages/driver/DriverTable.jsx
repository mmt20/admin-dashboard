import './style/driverTable.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { driverColumns } from '../../datatablesource';
import Loader from '../../components/Loader/Loader';
import AllDriverHook from '../../hook/driver/all-driver-table-hook';
import DatatableWithImage from '../../components/datatableWithImage/DatatableWithImage';

const DriverTable = () => {
  const [drivers, loading] = AllDriverHook();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        {loading === true ? (
          <Loader />
        ) : (
          <DatatableWithImage
            rows={drivers}
            coloum={driverColumns}
            type="drivers"
          />
        )}
      </div>
    </div>
  );
};

export default DriverTable;
