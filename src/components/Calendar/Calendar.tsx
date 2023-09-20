import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import "./Calendar.scss";

interface CalendarPropsType {
  datePickerLabel: string;
  date: Dayjs;
  handleDateChange: (newDate: Dayjs) => void;
  calenderView?: "monthAndYear" | "fullview";
}

/**
 * Component to render DatePicker
 * @param datePickerLabel - label text for date picker input
 * @param date - selected date
 * @param handleDateChange - callback function to chnage the date
 * @param calenderView (optional) - to indicate whether to show only month & year or full date format default value is full date
 */
const Calendar = ({
  datePickerLabel,
  date,
  handleDateChange,
  calenderView = "fullview",
}: CalendarPropsType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={datePickerLabel}
          value={date}
          onChange={(newValue) => {
            newValue && handleDateChange(newValue);
          }}
          format={calenderView === "fullview" ? "DD-MM-YYYY" : undefined}
          slotProps={{ textField: { size: "small" } }}
          className={calenderView === "fullview" ? "date-picker" : ""}
          views={
            calenderView === "fullview"
              ? ["year", "month", "day"]
              : ["month", "year"]
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
