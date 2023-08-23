import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getExpenseForSelectedDateApi } from "../../api/expenses";
import { ExpensesCategoriesListType } from "../../components/Types";
import Calendar from "../../components/Calendar/Calendar";
import useDate from "../../hooks/useDate";
import "./Expenses.scss";
import { Outlet } from "react-router-dom";

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

  const [expensesForSelectedDate, setExpensesForSelectedDate] = useState<
    Array<ExpensesListType>
  >([]);

  useEffect(() => {
    getExpenseForSelectedDateApi(date.toDate())
      .then((response) => {
        console.log(response.data as ExpensesListType);
        setExpensesForSelectedDate(response.data as Array<ExpensesListType>);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

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
          {expensesForSelectedDate.length ? (
            expensesForSelectedDate.map((expense) => (
              <div className="expense-continer" key={expense._id}>
                <div className="display-flex justify-content-space-between align-items-center">
                  <h2>{expense.itemName}</h2>
                  <div>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
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
            ))
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
