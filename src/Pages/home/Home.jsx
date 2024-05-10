import './home.scss';
import Sidebar from './../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from './../../components/chart/Chart';
import List from '../../components/table/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParent } from '../../redux/action/parentAction';
import { getAllStudentWithParent } from '../../redux/action/studentAction';
import { getAllSupervisor } from '../../redux/action/supervisorAction';
import { getAllDriver } from '../../redux/action/driverAction';
import { getAllBusesWithNames } from '../../redux/action/busAction';
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllParent());
      dispatch(getAllStudentWithParent());
      dispatch(getAllSupervisor());
      dispatch(getAllDriver());
      dispatch(getAllBusesWithNames());
    };

    fetchData();
  }, [dispatch]);
  const parents = useSelector((state) => state.allParents.parent.data) || [];
  const students = useSelector((state) => state.allStudents.students) || [];
  const supervisors =
    useSelector((state) => state.allSupervisors.supervisor.data) || [];
  const drivers = useSelector((state) => state.allDrivers.driver.data) || [];
  const buses = useSelector((state) => state.allBuses.bus) || [];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="parents" amount={parents.length} />
          <Widget type="student" amount={students.length} />
          <Widget type="supervisor" amount={supervisors.length} />
          <Widget type="driver" amount={drivers.length} />
          <Widget type="bus" amount={buses.length} />
        </div>
        <div className="charts">
          <Featured amount={students.length} />
          <Chart
            aspect={2 / 1}
            title="Last 6 Monthes Total Students Delivered To Home"
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Lastest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
