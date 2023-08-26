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
import { useParams } from "react-router-dom";

interface PropsType {
  type: "expenses" | "income";
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
  const [activeButton, setActiveButton] = React.useState<"expenses" | "income">(
    type
  );

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
   * Get expenseId from the url
   */
  const { expenseId } = useParams();

  /**
   * function to close add expenses/income drawer.
   * And redirect to previous route.
   */
  const closeDrawer = (): void => {
    resetStatesToDefaultValues();
    // clearing the localStorage, since we were storing the expense details
    // before user clicks on add-new-category button
    localStorage.length && localStorage.clear();
    setOpenDrawer(false);
    // redirect to previous route after a delay 200ms
    // so that user can experience drawer close instead of directly redirecting
    setTimeout(() => {
      window.history.back();
    }, 200);
  };

  /**
   * function to set all the states to default value.
   */
  const resetStatesToDefaultValues = (): void => {
    setActiveButton("expenses");
    handleDateChange(dayjs());
    setShowAddNewCategoryModel(false);
  };

  React.useEffect(() => {
    setOpenDrawer(true);
    if (type === "expenses") {
      getExpenseCategoriesApi().then((response) => {
        setExpenseCategoriesList(
          response.data as Array<ExpensesCategoriesListType>
        );
      });
    } else {
      getIncomeCategoriesApi().then((response) => {
        incomeCategoriesList.current = response.data
          .list as Array<IncomeCategoriesListType>;
      });
    }
  }, [type]);

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

              {expenseId ? (
                <h2 className="text-align-center">Edit an expense</h2>
              ) : (
                <ButtonGroup className="addIncomeOrExpense-add_button_group display-flex justify-content-center">
                  <Button
                    className={
                      activeButton === "expenses" ? "active-button" : ""
                    }
                    onClick={() =>
                      activeButton !== "expenses" && window.history.back()
                    }
                  >
                    Add Expenses
                  </Button>
                  <Button
                    className={activeButton === "income" ? "active-button" : ""}
                    onClick={() => (window.location.href = "/addIncome")}
                  >
                    Add Income
                  </Button>
                </ButtonGroup>
              )}

              {activeButton === "expenses" ? (
                <AddExpenses
                  selectedDate={date}
                  setShowAddNewCategoryModel={setShowAddNewCategoryModel}
                  expenseCategoriesList={expenseCategoriesList}
                  setExpenseCategoriesList={setExpenseCategoriesList}
                  closeDrawer={closeDrawer}
                  handleDateChange={handleDateChange}
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
