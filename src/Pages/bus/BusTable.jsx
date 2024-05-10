import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import { busColumns } from '../../datatablesource';

import Loader from './../../components/Loader/Loader';
import { AllBusHook } from '../../hook/bus/all-bus-table-hook';

const BusTable = () => {
  const [buses, loading] = AllBusHook();

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading === true ? (
          <Loader />
        ) : (
          <Datatable rows={buses} coloum={busColumns} type="buses" />
        )}
      </div>
    </div>
  );
};

export default BusTable;
