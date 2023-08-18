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

const Calendar = (props: CalendarPropsType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={props.datePickerLabel}
          value={props.date}
          onChange={(newValue) => {
            newValue && props.handleDateChange(newValue);
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
