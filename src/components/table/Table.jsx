import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const List = () => {
  const rows = [
    {
      id: 1143155,
      name: 'Ali',
      img: 'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      parent: 'Ahmed Mostafa',
      date: '1 March',
      status: 'OnWay',
    },
    {
      id: 2235235,
      name: 'Ali',
      img: 'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      parent: 'Ahmed Mostafa',
      date: '1 March',
      status: 'AtSchool',
    },
    {
      id: 2342353,
      name: 'Ali',
      img: 'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      parent: 'Ahmed Mostafa',
      date: '1 March',
      status: 'OnHome',
    },
    {
      id: 2357741,
      name: 'Ali',
      img: 'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      parent: 'Ahmed Mostafa',
      date: '1 March',
      status: 'Absent',
    },
    {
      id: 2342355,
      name: 'Ali',
      img: 'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      parent: 'Ahmed Mostafa',
      date: '1 March',
      status: 'OnWay',
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Student</TableCell>
            <TableCell className="tableCell">Parent</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.parent}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>

              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
