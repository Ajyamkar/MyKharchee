import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

/**
 * Custom hook for selecting a date from a calender.
 */
const useDate = () => {
  /**
   * State to select a date.
   */
  const [date, setDate] = useState<Dayjs>(dayjs());

  /*
   * Label text for date picker.
   */
  const datePickerLabel =
    new Date(dayjs(date).format()).toDateString() === new Date().toDateString()
      ? "Today"
      : "Selected date";

  /**
   * function to handle date change,
   * new date will not be selected for future date compared to today.
   * or it will be set to today's date.
   * @param newDate - newly selected date
   */
  const handleDateChange = (newDate: Dayjs) => {
    if (new Date(dayjs(newDate).format()) <= new Date()) {
      setDate(newDate);
    } else {
      setDate(dayjs());
    }
  };

  return {
    date,
    datePickerLabel,
    handleDateChange,
  };
};

export default useDate;
