/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { deleteIncome, getUserIncome } from "../../api/income";
import useDate from "../../hooks/useDate";
import Calendar from "../../components/Calendar/Calendar";
import "./Income.scss";
import ToastContext from "../../hooks/ToastContext";
import { Box, IconButton, Skeleton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import useIntermediateStates from "../../hooks/useIntermediateStates";

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
 * Component renders user incomes for a particular month
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

  /**
   * State to show selected month.
   */
  const [selectedMonth, setSelectedMonth] = useState("");

  /**
   * State to show total income for a selected month.
   */
  const [totalIncomeForMonth, setTotalIncomeForMonth] = useState(0);

  /**
   * State to show toast on success/failure of api call.
   */
  const { toastState, setToastState } = useContext(ToastContext);

  /**
   * Hook to manage intermediate states such as isfetching, isSaving etc.
   */
  const { intermediateState, setIntermediateState } = useIntermediateStates();

  React.useEffect(() => {
    setIntermediateState({ ...intermediateState, isFetching: true });
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
      })
      .finally(() =>
        setIntermediateState({ ...intermediateState, isFetching: false })
      );
  }, [date, toastState]);

  /**
   * function to delete an income for the selected income
   * @param selectedId - id of the income to be deleted
   */
  const deleteSelectedIncome = (selectedId: string) => {
    setIntermediateState({ ...intermediateState, isDeleting: true });
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
      })
      .finally(() =>
        setIntermediateState({ ...intermediateState, isDeleting: false })
      );
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

      {intermediateState.isFetching || intermediateState.isDeleting ? (
        <Box>
          <Skeleton height={150} />
          <Skeleton height={150} className="incomeSkeleton" />
          <Skeleton height={150} className="incomeSkeleton" />
          <Skeleton height={150} className="incomeSkeleton" />
        </Box>
      ) : (
        <div>
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
                      <Link
                        to={`${window.location.pathname}/editIncome/${income._id}`}
                      >
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => deleteSelectedIncome(income._id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Income;
