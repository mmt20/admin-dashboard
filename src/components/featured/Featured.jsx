import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
const Featured = ({ amount }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Students Dispatched</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className="title">Total students delivered to home today</p>
        <p className="amount">{amount}</p>
        <p className="desc">
          Former students who were successfully delivered home. Last students
          may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Wating</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">54</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">On Way</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">180</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">At Home</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">37</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
