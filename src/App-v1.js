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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <Route path="/">
            <Route path="login" element={<Login />} />
          </Route>
          {isLoggedIn && (
            <>
              <Route path="/">
                <Route index element={<Home />} />
              </Route>
              <Route path="parents">
                <Route index element={<ParentTable />} />
                <Route path=":parentId" element={<ParentProfile />} />
                <Route path="new" element={<NewParent />} />
                <Route path="editParent/:parentId" element={<EditParent />} />
              </Route>
              <Route path="supervisors">
                <Route index element={<SupervisorTable />} />
                <Route path=":supervisorId" element={<SupervisorProfile />} />
                <Route path="new" element={<NewSupervisor />} />
                <Route
                  path="editSupervisor/:supervisorId"
                  element={<EditSupervisor />}
                />
              </Route>
              <Route path="drivers">
                <Route index element={<DriverTable />} />
                <Route path=":driverId" element={<DriverProfile />} />
                <Route path="new" element={<NewDriver />} />
                <Route path="editDriver/:driverId" element={<EditDriver />} />
              </Route>
              <Route path="students">
                <Route index element={<StudentTable />} />
                <Route path=":studentsId" element={<StudentProfile />} />
                <Route path="new" element={<NewStudent />} />
                <Route
                  path="editStudent/:studentsId"
                  element={<EditStudent />}
                />
              </Route>
              <Route path="buses">
                <Route index element={<BusTable />} />
                <Route path="new" element={<NewBus />} />
                <Route path="editBus/:BusId" element={<EditBus />} />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
