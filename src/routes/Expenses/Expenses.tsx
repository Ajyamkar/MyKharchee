import { Delete, Edit } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  deleteExpenseByExpenseId,
  getExpenseForSelectedDateApi,
} from "../../api/expenses";
import { ExpensesCategoriesListType } from "../../components/Types";
import Calendar from "../../components/Calendar/Calendar";
import useDate from "../../hooks/useDate";
import "./Expenses.scss";
import { Link, Outlet } from "react-router-dom";
import ToastContext from "../../hooks/ToastContext";

interface ExpensesListType {
  _id: string;
  itemName: string;
  amount: number;
  category: ExpensesCategoriesListType;
}

const Expenses = () => {
  /**
   * State to keep to track of selected date & to change the date.
   */
  const { date, datePickerLabel, handleDateChange } = useDate();

  /**
   * State to keep to track of expenses list for a selected date.
   */
  const [expensesForSelectedDate, setExpensesForSelectedDate] = useState<
    Array<ExpensesListType>
  >([]);

  /**
   * State to keep track of total expenses amount for a selected date.
   */
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const { toastState, setToastState } = useContext(ToastContext);

  /**
   * Boolean to show loader while data is being fetched.
   */
  const [isFetching, setIsFetching] = useState(true);

  /**
   * Expenses are re-fetched whenever there is change in date & toastState,
   * ToastState is added in dependency arr so that whenever add/edit/delete
   * expense operation is completed, the updated expensesForSelectedDate is
   * upto date with latest data.
   */
  useEffect(() => {
    setIsFetching(true);
    getExpenseForSelectedDateApi(date.toDate())
      .then((response) => {
        setExpensesForSelectedDate(
          response.data.expenses as Array<ExpensesListType>
        );
        setTotalExpenseAmount(response.data.totalExpenseAmount as number);
      })
      .catch(() => setExpensesForSelectedDate([]))
      .finally(() => setIsFetching(false));
  }, [date, toastState]);

  /**
   * Function to delete an expense.
   * @param expenseId - id of the expense to be deleted
   */
  const deleteExpense = (expenseId: string) => {
    deleteExpenseByExpenseId(expenseId)
      .then(() => {
        setToastState({
          isOpened: true,
          message: "Successfully deleted an expense",
          status: "success",
        });
      })
      .catch((err) => {
        setToastState({
          isOpened: true,
          message: "Something went wrong, try again",
          status: "error",
        });
      });
  };

  return (
    <>
      <div className="expenses-main-container">
        <div className="header display-flex align-items-center justify-content-space-between">
          <h1>Expenses</h1>
          <Calendar
            date={date}
            datePickerLabel={datePickerLabel}
            handleDateChange={handleDateChange}
          />
        </div>

        <div className="expenses-list-container">
          {isFetching ? (
            <CircularProgress />
          ) : expensesForSelectedDate.length ? (
            <>
              <h3 className="text-align-center">
                Total Expenses for {date.toDate().toDateString()} is{" "}
                <span className="color-error">{totalExpenseAmount}</span>
              </h3>
              {expensesForSelectedDate.map((expense) => (
                <div className="expense-continer" key={expense._id}>
                  <div className="display-flex justify-content-space-between align-items-center">
                    <h2>{expense.itemName}</h2>
                    <div>
                      <Link
                        to={`${window.location.pathname}/editExpense/${expense._id}`}
                      >
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => {
                          deleteExpense(expense._id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>

                  <div className="display-flex justify-content-space-between align-items-center">
                    <h2 className="color-error">- {expense.amount}</h2>
                    <span className="category">
                      {expense.category.categoryName}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h1>Expenses not added for selected date</h1>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Expenses;
