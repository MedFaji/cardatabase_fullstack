import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import { Car } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";


const AddCar = () => {

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    color: "",
    model: "",
    modelYear: 0,
    price: 0,
    registerNumber: "",
  });

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal form
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(car);
    setCar({
      brand: "",
      model: "",
      color: "",
      registerNumber: "",
      modelYear: 0,
      price: 0,
    });
    handleClose();
  };

  const queryClient = useQueryClient();

  // Add mutate
  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div>
      <Button onClick={handleClickOpen}>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
