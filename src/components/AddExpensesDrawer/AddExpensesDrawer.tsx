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
import { ExpensesCategoriesListType, IncomeCategoriesListType } from "./Types";
import {
  getExpenseCategoriesApi,
  getIncomeCategoriesApi,
} from "../../api/expenses";

/**
 * Component to render AddExpense/AddIncome model.
 */
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
  const [date, setDate] = React.useState<Dayjs>(dayjs());

  /**
   * State to show create-new-category flow.
   */
  const [showAddNewCategoryModel, setShowAddNewCategoryModel] =
    React.useState(false);

  /**
   * List of available income categories.
   */
  const incomeCategoriesList = React.useRef<Array<IncomeCategoriesListType>>(
    []
  );

  /**
   * State to maintain list of expense categories.
   */
  const [expenseCategoriesList, setExpenseCategoriesList] = React.useState<
    Array<ExpensesCategoriesListType>
  >([]);

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
   * function to close add expenses/income drawer.
   */
  const closeDrawer = (): void => {
    resetStatesToDefaultValues();
    setOpenDrawer(false);
  };

  /**
   * function to set all the states to default value.
   */
  const resetStatesToDefaultValues = (): void => {
    setActiveButton("addExpenses");
    setDate(dayjs());
    setShowAddNewCategoryModel(false);
  };

  React.useEffect(() => {
    getExpenseCategoriesApi().then((response) => {
      setExpenseCategoriesList(
        response.data as Array<ExpensesCategoriesListType>
      );
    });
    getIncomeCategoriesApi().then((response) => {
      incomeCategoriesList.current = response.data
        .list as Array<IncomeCategoriesListType>;
    });
  }, []);

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
          <div
            className={
              showAddNewCategoryModel ? "display-block" : "display-none"
            }
          >
            <AddCategory
              setShowAddNewCategoryModel={setShowAddNewCategoryModel}
              setExpenseCategoriesList={setExpenseCategoriesList}
              expenseCategoriesList={expenseCategoriesList}
            />
          </div>

          <div
            className={
              showAddNewCategoryModel ? "display-none" : "display-block"
            }
          >
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
                className={
                  activeButton === "addExpenses" ? "active-button" : ""
                }
                onClick={() => setActiveButton("addExpenses")}
              >
                Add Expenses
              </Button>
              <Button
                className={activeButton === "addIncome" ? "active-button" : ""}
                onClick={() => {
                  setActiveButton("addIncome");
                }}
              >
                Add Income
              </Button>
            </ButtonGroup>

            {activeButton === "addExpenses" ? (
              <AddExpenses
                selectedDate={date}
                setShowAddNewCategoryModel={setShowAddNewCategoryModel}
                expenseCategoriesList={expenseCategoriesList}
                setExpenseCategoriesList={setExpenseCategoriesList}
                closeDrawer={closeDrawer}
              />
            ) : (
              <AddIncome
                incomeCategoriesList={incomeCategoriesList.current}
                closeDrawer={closeDrawer}
              />
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
