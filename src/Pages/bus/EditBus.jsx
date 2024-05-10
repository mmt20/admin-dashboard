import './style/newBus.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import EditBusHook from '../../hook/bus/edit-bus-hook';

const EditBus = () => {
  const currentURL = window.location.href;
  const id = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  const [
    formData,
    drivers,
    loadingDrivers,
    supervisors,
    loadingSupervisors,
    handleInputChange,
    handleSubmit,
  ] = EditBusHook(id);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Bus Information </h1>
        </div>
        <div className="bottom">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="fromInput">
                <label>Bus Number</label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber || ''}
                  onChange={handleInputChange}
                  placeholder="س ج ط 2594"
                />
              </div>
              <div className="fromInput">
                <label>Bus Line</label>
                <input
                  type="text"
                  name="busLine"
                  value={formData.busLine || ''}
                  onChange={handleInputChange}
                  placeholder="Dalga"
                />
              </div>
              <div className="fromInput">
                <label>Bus Driver</label>
                <TextField
                  className="textField"
                  id="selectDriver"
                  variant="standard"
                  value={formData.driver || ''}
                  name="driver"
                  select
                  onChange={handleInputChange}
                >
                  {loadingDrivers ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    drivers &&
                    drivers.map((driver) => (
                      <MenuItem key={driver.ID} value={driver.ID}>
                        {driver['Driver Name']}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </div>
              <div className="fromInput">
                <label>Bus Supervisor</label>
                <TextField
                  className="textField"
                  id="selectSupervisor"
                  variant="standard"
                  value={formData.supervisor || ''}
                  name="supervisor"
                  select
                  onChange={handleInputChange}
                >
                  {loadingSupervisors ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    supervisors.map((supervisor) => (
                      <MenuItem key={supervisor.ID} value={supervisor.ID}>
                        {supervisor['Supervisor Name']}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditBus;
