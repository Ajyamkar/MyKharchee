import "./AddIncomeOrExpense.scss";
import { Button, ButtonGroup, Drawer } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import React from "react";
import dayjs from "dayjs";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import AddIncome from "../../components/AddIncome/AddIncome";
import AddCategory from "../../components/AddCategory/AddCategory";
import {
  ExpensesCategoriesListType,
  IncomeCategoriesListType,
} from "../../components/Types";
import {
  getExpenseCategoriesApi,
  getIncomeCategoriesApi,
} from "../../api/expenses";
import Calendar from "../../components/Calendar/Calendar";
import useDate from "../../hooks/useDate";

interface PropsType {
  type: "addExpenses" | "addIncome";
}

/**
 * Component to render AddExpense/AddIncome model.
 * @param type - to render model for addExpenses or addIncome
 */
const AddIncomeOrExpense = ({ type }: PropsType) => {
  /**
   * State to open or close add-expenses drawer.
   */
  const [openDrawer, setOpenDrawer] = React.useState(false);

  /**
   * State to show add-expenses/income flow.
   */
  const [activeButton, setActiveButton] = React.useState<
    "addExpenses" | "addIncome"
  >(type);

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
    setOpenDrawer(true);
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
    <div className="addIncomeOrExpense-main-container">
      <Drawer
        className="addIncomeOrExpense-drawer"
        anchor="bottom"
        open={openDrawer}
        onClose={closeDrawer}
      >
        <div className="addIncomeOrExpense-drawer_container">
          {showAddNewCategoryModel ? (
            <AddCategory
              setShowAddNewCategoryModel={setShowAddNewCategoryModel}
              setExpenseCategoriesList={setExpenseCategoriesList}
              expenseCategoriesList={expenseCategoriesList}
            />
          ) : (
            <>
              <div className="addIncomeOrExpense-drawer_top_container display-flex justify-content-space-between align-items-center">
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

              <ButtonGroup className="addIncomeOrExpense-add_button_group display-flex justify-content-center">
                <Button
                  className={
                    activeButton === "addExpenses" ? "active-button" : ""
                  }
                  onClick={() => (window.location.href = "/addExpenses")}
                >
                  Add Expenses
                </Button>
                <Button
                  className={
                    activeButton === "addIncome" ? "active-button" : ""
                  }
                  onClick={() => (window.location.href = "/addIncome")}
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

export default AddIncomeOrExpense;
