import "./AddExpensesDrawer.scss";
import {
  Alert,
  Button,
  ButtonGroup,
  Drawer,
  IconButton,
  Snackbar,
} from "@mui/material";
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
import { SnackbarType } from "./Types";

const AddExpensesDrawer: React.FC = () => {
  /**
   * State to open or close add-expenses drawer.
   */
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  /**
   * State to show add-expenses/income flow.
   */
  const [activeButton, setActiveButton] = React.useState<
    "addExpenses" | "addIncome"
  >("addExpenses");

  /**
   * State to add expense/income for the selected date.
   */
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  /**
   * State to show create-new-category flow.
   */
  const [showAddNewCategoryModel, setShowAddNewCategoryModel] =
    React.useState(false);

  /**
   * State to open or close snackbar after saving new category.
   */
  const [snackbarState, setSnackbarState] = React.useState<SnackbarType>({
    isOpened: false,
    status: "success",
    message: "",
  });

  /**
   * State to maintain list of expense categories.
   */
  const [expenseCategoriesList, setExpenseCategoriesList] = React.useState([
    "Grocery",
    "Shopping",
    "Electricity Bill",
    "Extra",
  ]);

  /**
   * Label text for date picker.
   */
  const datePickerLabel =
    new Date(dayjs(date).format()).toDateString() === new Date().toDateString()
      ? "Today"
      : "Selected date";

  /**
   * function to handle date change,
   * new date will be selected if selected date is previous date compared with today's date
   * or it will be set to today's date.
   * @param newValue - new selected date
   */
  const handleDateChange = (newValue: Dayjs) => {
    if (new Date(dayjs(newValue).format()) <= new Date()) {
      setDate(newValue);
    } else {
      setDate(dayjs());
    }
  };

  /**
   * Function to close snackbar.
   */
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, isOpened: false });
  };

  /**
   * function to close add expenses/income drawer.
   */
  const closeDrawer = (): void => {
    resetStatesToDefaultValues();
    setOpenDrawer(false);
    localStorage.clear();
  };

  /**
   * function to set all the states to default value.
   */
  const resetStatesToDefaultValues = (): void => {
    setActiveButton("addExpenses");
    setDate(dayjs());
    setShowAddNewCategoryModel(false);
  };

  /**
   * Component to show AddExpenses or AddIncome depending on which one is selected.
   * @returns {JSX.Element}
   */
  const ExpenseOrIncomeComponent = () => {
    return activeButton === "addExpenses" ? (
      <AddExpenses
        setShowAddNewCategoryModel={setShowAddNewCategoryModel}
        expenseCategoriesList={expenseCategoriesList}
        setExpenseCategoriesList={setExpenseCategoriesList}
        setSnackbarState={setSnackbarState}
      />
    ) : (
      <AddIncome />
    );
  };

  /**
   * Component to show AddExpenses/AddIncome content when showAddNewCategoryModel is false.
   * @returns {JSX.Element}
   */
  const ShowMainDrawerContent = () => {
    return (
      <>
        <div className="addExpensesDrawer-drawer_top_container display-flex justify-content-space-between align-items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={datePickerLabel}
                value={date}
                onChange={(newValue) => {
                  newValue && handleDateChange(newValue);
                }}
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

        <ButtonGroup className="addExpensesDrawer-add_button_group display-flex justify-content-center">
          <Button
            className={activeButton === "addExpenses" ? "active-button" : ""}
            onClick={() => setActiveButton("addExpenses")}
          >
            Add Expenses
          </Button>
          <Button
            className={activeButton === "addIncome" ? "active-button" : ""}
            onClick={() => {
              setActiveButton("addIncome");
              localStorage.clear();
            }}
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
              setExpenseCategoriesList={setExpenseCategoriesList}
              expenseCategoriesList={expenseCategoriesList}
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}
            />
          ) : (
            <ShowMainDrawerContent />
          )}
        </div>

        <Snackbar
          open={snackbarState.isOpened}
          autoHideDuration={2000}
          onClose={closeSnackbar}
        >
          <Alert
            severity={snackbarState.status}
            onClose={closeSnackbar}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
