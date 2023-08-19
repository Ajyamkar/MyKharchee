import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import "./Calendar.scss";

interface CalendarPropsType {
  datePickerLabel: string;
  date: Dayjs;
  handleDateChange: (newDate: Dayjs) => void;
}

/**
 * Component to render DatePicker
 * @param datePickerLabel - label text for date picker input
 * @param date - selected date
 * @param handleDateChange - callback function to chnage the date
 * @returns
 */
const Calendar = ({
  datePickerLabel,
  date,
  handleDateChange,
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
          format="DD-MM-YYYY"
          slotProps={{ textField: { size: "small" } }}
          className="date-picker"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
