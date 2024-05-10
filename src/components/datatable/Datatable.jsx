import './datatable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmationDialog from './../confirmdialog/ConfirmationDialog';
import { deleteBus, getAllBusesWithNames } from '../../redux/action/busAction';

const Datatable = ({ rows, coloum, type }) => {
  const [data, setData] = useState(
    rows.map((row, index) => ({ ...row, id: index + 1 }))
  );

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(rows.map((row, index) => ({ ...row, id: index + 1 })));
  }, [rows]);

  const handelDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (type === 'buses') {
      await dispatch(deleteBus(deleteId));
      setIsDeleteDialogOpen(false);
      dispatch(getAllBusesWithNames());
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
            {type === 'buses' ? (
              <Link
                to={`/buses/editBus/${params.row.ID}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="viewButton">Edit</div>
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
  const name = type === 'buses' && 'Bus';
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

export default Datatable;
