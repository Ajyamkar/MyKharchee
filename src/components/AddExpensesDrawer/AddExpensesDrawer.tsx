import "./AddExpensesDrawer.css";
import { Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

const AddExpensesDrawer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <div className="addExpensesDrawer-main-container">
      <IconButton className="addExpensesDrawer-button" onClick={toggleDrawer}>
        <AddCircleIcon fontSize="large" className="addExpensesDrawer-icon" />
      </IconButton>
      <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer}>
        <h1>Add Expenses</h1>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
