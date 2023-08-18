import "./AddExpensesDrawer.scss";
import { Button, ButtonGroup, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import React from "react";
import dayjs from "dayjs";
import AddExpenses from "./AddExpenses/AddExpenses";
import AddIncome from "./AddIncome/AddIncome";
import AddCategory from "./AddCategory/AddCategory";
import { ExpensesCategoriesListType, IncomeCategoriesListType } from "./Types";
import {
  getExpenseCategoriesApi,
  getIncomeCategoriesApi,
} from "../../api/expenses";
import Calendar from "../Calendar/Calendar";
import useDate from "../../hooks/useDate";

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
  const { date, datePickerLabel, handleDateChange } = useDate();

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
   * function to close add expenses/income drawer.
   */
  const closeDrawer = (): void => {
    resetStatesToDefaultValues();
    // clearing the localStorage, since we were storing the expense details
    // before user clicks on add-new-category button
    localStorage.length && localStorage.clear();

    setOpenDrawer(false);
  };

  /**
   * function to set all the states to default value.
   */
  const resetStatesToDefaultValues = (): void => {
    setActiveButton("addExpenses");
    handleDateChange(dayjs());
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
          {showAddNewCategoryModel ? (
            <AddCategory
              setShowAddNewCategoryModel={setShowAddNewCategoryModel}
              setExpenseCategoriesList={setExpenseCategoriesList}
              expenseCategoriesList={expenseCategoriesList}
            />
          ) : (
            <>
              <div className="addExpensesDrawer-drawer_top_container display-flex justify-content-space-between align-items-center">
                <Calendar
                  datePickerLabel={datePickerLabel}
                  date={date}
                  handleDateChange={handleDateChange}
                />
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
                  className={
                    activeButton === "addIncome" ? "active-button" : ""
                  }
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
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default AddExpensesDrawer;
