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
import AddExpenses from "./AddExpenses/AddExpenses";
import AddIncome from "./AddIncome/AddIncome";
import AddCategory from "./AddCategory/AddCategory";

const AddExpensesDrawer: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [activeButton, setActiveButton] = React.useState<
    "addExpenses" | "addIncome"
  >("addExpenses");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [showAddNewCategoryModel, setShowAddNewCategoryModel] =
    React.useState(false);

  // Constants:
  // Todo: Fix the date comparision issue.
  const datePickerLabel =
    date?.date() === new Date().getDate() ? "Today" : "Choose date";

  // functions
  const closeDrawer = (): void => {
    resetStatesToDefaultValues();
    setOpenDrawer(false);
  };

  const resetStatesToDefaultValues = (): void => {
    setActiveButton("addExpenses");
    setDate(dayjs());
    setShowAddNewCategoryModel(false);
  };

  // JSX ELEMENTS:
  const ExpenseOrIncomeComponent = () => {
    return activeButton === "addExpenses" ? (
      <AddExpenses setShowAddNewCategoryModel={setShowAddNewCategoryModel} />
    ) : (
      <AddIncome />
    );
  };
  const AddExpensesORIncomeTopContainer = () => {
    return (
      <>
        <div className="addExpensesDrawer-drawer_top_container display-flex justify-content_space-between align-items_center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={datePickerLabel}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="DD-MM-YYYY"
                slotProps={{ textField: { size: "small" } }}
                className="date-picker"
              />
            </DemoContainer>
          </LocalizationProvider>
          <HighlightOffOutlinedIcon
            onClick={closeDrawer}
            fontSize="large"
            sx={{ cursor: "pointer" }}
          />
        </div>

        <ButtonGroup className="addExpensesDrawer-add_button_group display-flex justify-content_center">
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

        <ExpenseOrIncomeComponent />
      </>
    );
  };

  return (
    <div className="addExpensesDrawer-main-container">
      <IconButton
        className="addExpensesDrawer-button"
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <AddCircleIcon className="addExpensesDrawer-icon" />
      </IconButton>

      <Drawer
        className="addExpensesDrawer-drawer"
        anchor="bottom"
        open={openDrawer}
        onClose={closeDrawer}
      >
        <div className="addExpensesDrawer-drawer_container">
          {showAddNewCategoryModel ? (
            <AddCategory
              setShowAddNewCategoryModel={setShowAddNewCategoryModel}
            />
          ) : (
            <AddExpensesORIncomeTopContainer />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
