import './widget.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link } from 'react-router-dom';
const Widget = ({ type, amount = 100 }) => {
  let data;
  // temporary
  //let amount = 100;

  switch (type) {
    case 'parents':
      data = {
        title: 'PARENTS',
        link: 'See all PARENTS',
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: 'dodgerBlue',
              backgroundColor: 'rgba( 30, 144, 255, 0.2 )',
            }}
          />
        ),
      };
      break;
    case 'student':
      data = {
        title: 'STUDENTS',
        link: 'See all students',
        icon: (
          <ChildCareOutlinedIcon
            className="icon"
            style={{
              color: 'deepSkyBlue',
              backgroundColor: 'rgba( 0, 191, 255, 0.2 )',
            }}
          />
        ),
      };
      break;
    case 'supervisor':
      data = {
        title: 'SUPERVISORS',
        link: 'See all supervisors',
        icon: (
          <SupervisorAccountOutlinedIcon
            className="icon"
            style={{
              color: 'darkBlue',
              backgroundColor: 'rgba( 0, 0, 139, 0.2 )',
            }}
          />
        ),
      };
      break;
    case 'driver':
      data = {
        title: 'DRIVERS',
        link: 'See all drivers',
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: 'darkGreen',
              backgroundColor: 'rgba( 0, 100, 0, 0.2 )',
            }}
          />
        ),
      };
      break;

    case 'bus':
      data = {
        title: 'BUSES',
        link: 'See all buses',
        icon: (
          <DirectionsBusFilledOutlinedIcon
            className="icon"
            style={{
              color: 'darkOrange',
              backgroundColor: 'rgba( 255, 140, 0, 0.2 )',
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{amount}</span>
        <Link
          to={'/' + data.title.toLowerCase()}
          style={{ textDecoration: 'none' }}
        >
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
