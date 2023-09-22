/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { deleteIncome, getUserIncome } from "../../api/income";
import useDate from "../../hooks/useDate";
import Calendar from "../../components/Calendar/Calendar";
import "./Income.scss";
import ToastContext from "../../hooks/ToastContext";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface IncomesListType {
  _id: string;
  amount: number;
  date: string;
  month: string;
  year: number;
  source: {
    category: string;
  };
}

/**
 * Component renders user income get for a particular month
 */
const Income = () => {
  /**
   * State to show income for the selected date.
   */
  const { date, handleDateChange } = useDate();

  /**
   * List of incomes for a selected month.
   */
  const [incomesList, setIncomeList] = useState<Array<IncomesListType>>([]);

  const [selectedMonth, setSelectedMonth] = useState("");

  const [totalIncomeForMonth, setTotalIncomeForMonth] = useState(0);

  const { toastState, setToastState } = useContext(ToastContext);

  React.useEffect(() => {
    getUserIncome(date.toDate())
      .then((response) => {
        const { incomesForSelectedMonth, selectedMonth, totalIncomeForMonth } =
          response.data;
        setIncomeList(incomesForSelectedMonth as Array<IncomesListType>);
        setSelectedMonth(selectedMonth);
        setTotalIncomeForMonth(totalIncomeForMonth);
      })
      .catch(() => {
        setToastState({
          isOpened: true,
          status: "error",
          message: "something went wrong try again",
        });
      });
  }, [date, toastState]);

  /**
   * function to delete an income for the selected income
   * @param selectedId - id of the income to be deleted
   */
  const deleteSelectedIncome = (selectedId: string) => {
    deleteIncome(selectedId)
      .then((response) => {
        setToastState({
          isOpened: true,
          status: "success",
          message: response.data,
        });
      })
      .catch(() => {
        setToastState({
          isOpened: true,
          status: "error",
          message: "something went wrong try again",
        });
      });
  };

  return (
    <div className="income">
      <div>
        <h1>Income</h1>

        <Calendar
          date={date}
          handleDateChange={handleDateChange}
          datePickerLabel={
            date.toDate().getMonth() === new Date().getMonth()
              ? "this month"
              : "Selected month"
          }
          calenderView="monthAndYear"
        />
      </div>

      <p className="text-align-center">
        Total income for <b>{selectedMonth}</b> is{" "}
        <span className="color-success bold font-size-larger">
          {totalIncomeForMonth}
        </span>
      </p>
      <ul>
        {incomesList.map((income) => {
          return (
            <li key={income._id}>
              <div className="display-flex justify-content-space-between align-items-center">
                <p>{income.date}</p>
                <span className="bold color-success font-size-larger">
                  +{income.amount}
                </span>
              </div>
              <div className="display-flex justify-content-space-between align-items-center">
                <p className="category">{income.source.category}</p>
                <div>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteSelectedIncome(income._id)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Outlet />
    </div>
  );
};

export default Income;
