import "./AddExpensesDrawer.scss";
import { Button, ButtonGroup, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import React from "react";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddExpensesDrawer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [activeButton, setActiveButton] = React.useState<
    "addExpenses" | "addIncome"
  >("addExpenses");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <div className="addExpensesDrawer-main-container">
      <IconButton className="addExpensesDrawer-button" onClick={toggleDrawer}>
        <AddCircleIcon className="addExpensesDrawer-icon" />
      </IconButton>

      <Drawer
        className="addExpensesDrawer-drawer"
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <div className="addExpensesDrawer-drawer_container">
          <div className="addExpensesDrawer-drawer_top_container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Choose date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  format="DD-MM-YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  className="date-picker"
                />
              </DemoContainer>
            </LocalizationProvider>
            <HighlightOffOutlinedIcon
              onClick={toggleDrawer}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
          </div>

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
