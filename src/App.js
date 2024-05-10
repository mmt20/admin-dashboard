import Login from './Pages/login/Login';
import ParentTable from './Pages/parent/ParentTable';
import NewParent from './Pages/parent/NewParent';
import ParentProfile from './Pages/parent/ParentProfile';
import SupervisorTable from './Pages/supervisor/SupervisorTable';
import SupervisorProfile from './Pages/supervisor/SupervisorProfile';
import NewSupervisor from './Pages/supervisor/NewSupervisor';
import DriverTable from './Pages/driver/DriverTable';
import DriverProfile from './Pages/driver/DriverProfile';
import NewDriver from './Pages/driver/NewDriver';
import BusTable from './Pages/bus/BusTable';
import NewBus from './Pages/bus/NewBus';
import StudentTable from './Pages/student/StudentTable';
import StudentProfile from './Pages/student/StudentProfile';
import NewStudent from './Pages/student/NewStudent';
import Home from './Pages/home/Home';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import './style/dark.scss';
import EditParent from './Pages/parent/EditParent';
import EditBus from './Pages/bus/EditBus';
import EditSupervisor from './Pages/supervisor/EditSupervisor';
import EditDriver from './Pages/driver/EditDriver';
import EditStudent from './Pages/student/EditStudent';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(!!storedToken);
  }, []);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/parents" element={<ParentTable />} />
            <Route path="/parents/:parentId" element={<ParentProfile />} />
            <Route path="/parents/new" element={<NewParent />} />
            <Route path="/supervisors" element={<SupervisorTable />} />
            <Route
              path="/supervisors/:supervisorId"
              element={<SupervisorProfile />}
            />
            <Route path="/supervisors/new" element={<NewSupervisor />} />
            <Route path="/drivers" element={<DriverTable />} />
            <Route path="/drivers/:driverId" element={<DriverProfile />} />
            <Route path="/drivers/new" element={<NewDriver />} />
            <Route path="/buses" element={<BusTable />} />
            <Route path="/buses/new" element={<NewBus />} />
            <Route path="/students" element={<StudentTable />} />
            <Route path="/students/:studentId" element={<StudentProfile />} />
            <Route path="/students/new" element={<NewStudent />} />
            <Route
              path="/parents/editParent/:parentId"
              element={<EditParent />}
            />
            <Route path="/buses/editBus/:BusId" element={<EditBus />} />
            <Route
              path="/supervisors/editSupervisor/:supervisorId"
              element={<EditSupervisor />}
            />
            <Route
              path="/drivers/editDriver/:driverId"
              element={<EditDriver />}
            />
            <Route
              path="/students/editStudent/:studentId"
              element={<EditStudent />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function PrivateRoute() {
  let userid = localStorage.getItem('token') == null ? false : true;
  return <>{userid ? <Outlet /> : <Navigate to="/login" />};</>;
}

export default App;
