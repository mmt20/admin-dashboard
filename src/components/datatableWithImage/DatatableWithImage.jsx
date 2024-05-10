import './datatableWithImage.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmationDialog from '../confirmdialog/ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { deleteDriver, getAllDriver } from '../../redux/action/driverAction';
import { deleteParent, getAllParent } from '../../redux/action/parentAction';
import {
  deleteSupervisor,
  getAllSupervisor,
} from '../../redux/action/supervisorAction';
import {
  deleteStudent,
  getAllStudentWithParent,
} from '../../redux/action/studentAction';

const DatatableWithImage = ({ rows = [], coloum, type }) => {
  const [data, setData] = useState(
    rows.map((row, index) => ({ ...row, id: index + 1 }))
  );
  console.log('Rows:', rows);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to manage the visibility of the delete confirmation dialog
  const dispatch = useDispatch();
  useEffect(() => {
    if (rows.length === 0) {
      console.log('No rows available');
      return;
    }
    const transformedData = rows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setData(transformedData);
  }, [rows]);

  const handelDelete = (id) => {
    console.log('ID', id);
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (type === 'drivers') {
      await dispatch(deleteDriver(deleteId));
      setIsDeleteDialogOpen(false);
      dispatch(getAllDriver());
    }
    if (type === 'parents') {
      await dispatch(deleteParent(deleteId));
      setIsDeleteDialogOpen(false);
      dispatch(getAllParent());
    }
    if (type === 'supervisors') {
      await dispatch(deleteSupervisor(deleteId));
      setIsDeleteDialogOpen(false);
      dispatch(getAllSupervisor());
    }
    if (type === 'students') {
      await dispatch(deleteStudent(deleteId));
      setIsDeleteDialogOpen(false);
      dispatch(getAllStudentWithParent());
    }
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const actionColum = [
    {
      id: 'action',
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {type !== 'buses' ? (
              <Link
                to={`/${type}/${params.row.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="viewButton">View</div>
              </Link>
            ) : null}

            <div
              className="deleteButton"
              onClick={() => handelDelete(params.row.ID)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  // make first letter uppercase
  //const name = type.charAt(0).toUpperCase() + type.slice(1);
  const name =
    type === 'students'
      ? 'Student'
      : type === 'buses'
      ? 'Bus'
      : type === 'drivers'
      ? 'Driver'
      : type === 'supervisors'
      ? 'Supervisor'
      : type === 'parents'
      ? 'Parent'
      : type.slice(0, -1);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {name}
        <Link to={`/${type}/new`} className="link">
          Add New {name}
        </Link>
      </div>

      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        className="datagrid"
        rows={data}
        getRowId={(row) => row.ID}
        columns={coloum.concat(actionColum)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9, 10]}
        checkboxSelection
      />
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          message={`Are you sure you want to delete this ${name}?`}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default DatatableWithImage;
