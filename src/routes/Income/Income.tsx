import React from "react";
import { Outlet } from "react-router-dom";
import { getUserIncome } from "../../api/income";
import useDate from "../../hooks/useDate";
import Calendar from "../../components/Calendar/Calendar";

/**
 * Component renders user income get for a particular month
 */
const Income = () => {
  /**
   * State to show income for the selected date.
   */
  const { date, handleDateChange } = useDate();

  React.useEffect(() => {
    getUserIncome(date.toDate())
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <div>
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
      <Outlet />
    </div>
  );
};

export default Income;
