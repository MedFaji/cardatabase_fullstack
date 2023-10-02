import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

const Carlist = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      // Car deleted
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "registerNumber", headerName: "Reg.nr.", width: 150 },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
        field: 'edit',
        headerName: '',
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => 
          <EditCar cardata={params.row} />
      },
    {
      field: "delete",
      headerName: "",
      width: 90,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,

      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (window.confirm("Are you sure to delete?"))
              mutate(params.row._links.car.href);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (!isSuccess) {
    return <p>Loading...</p>;
  } else if (error) {
    <p>Error while fetching cars...</p>;
  } else {
    return (
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }
};

export default Carlist;
