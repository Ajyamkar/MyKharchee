import "./AddExpensesDrawer.scss";
import { Button, ButtonGroup, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

const AddExpensesDrawer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [activeButton, setActiveButton] = React.useState<
    "addExpenses" | "addIncome"
  >("addExpenses");

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <div className="addExpensesDrawer-main-container">
      <IconButton className="addExpensesDrawer-button" onClick={toggleDrawer}>
        <AddCircleIcon fontSize="large" className="addExpensesDrawer-icon" />
      </IconButton>
      <Drawer
        className="addExpensesDrawer-drawer"
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <div className="addExpensesDrawer-drawer_container">
          <ButtonGroup className="addExpensesDrawer-add_button_group">
            <Button
              className={activeButton === "addExpenses" ? "active-button" : ""}
              onClick={() => setActiveButton("addExpenses")}
            >
              Add Expenses
            </Button>
            <Button
              className={activeButton === "addIncome" ? "active-button" : ""}
              onClick={() => setActiveButton("addIncome")}
            >
              Add Income
            </Button>
          </ButtonGroup>
        </div>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
