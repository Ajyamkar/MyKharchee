import { useEffect, useState } from "react";
import { getExpenseForSelectedDateApi } from "../../api/expenses";
import { ExpensesCategoriesListType } from "../../components/AddExpensesDrawer/Types";
import Calendar from "../../components/Calendar/Calendar";
import useDate from "../../hooks/useDate";
import "./Expenses.scss";

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
              <h1>{expense.itemName}</h1>
              <h1>{expense.amount}</h1>
              <h2>Category: {expense.category.categoryName}</h2>
            </div>
          ))
        ) : (
          <h1>Expenses not added for selected date</h1>
        )}
      </div>
    </div>
  );
};

export default Expenses;
