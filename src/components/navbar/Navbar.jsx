import './navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; // Import the light mode icon
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext, useEffect, useState } from 'react';
const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      dispatch({ type: storedDarkMode === 'true' ? 'DARK' : 'LIGHT' });
    }
  }, [dispatch]);
  const toggleDarkMode = () => {
    dispatch({ type: darkMode ? 'LIGHT' : 'DARK' });
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullscreen(false);
    }
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {darkMode ? (
              <LightModeOutlinedIcon
                className="icon"
                style={{ cursor: 'pointer' }}
                onClick={toggleDarkMode}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="icon"
                style={{ cursor: 'pointer' }}
                onClick={toggleDarkMode}
              />
            )}
          </div>
          <div className="item">
            {fullscreen ? (
              <FullscreenExitOutlinedIcon
                onClick={toggleFullscreen}
                className="icon"
                style={{
                  cursor: 'pointer',
                }}
              />
            ) : (
              <FullscreenOutlinedIcon
                onClick={toggleFullscreen}
                className="icon"
                style={{
                  cursor: 'pointer',
                }}
              />
            )}
          </div>
          <div className="item">
            <NotificationsOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg"
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
