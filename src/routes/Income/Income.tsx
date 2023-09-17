import React from "react";
import { Outlet } from "react-router-dom";
import { getUserIncome } from "../../api/income";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Income = () => {
  React.useEffect(() => {
    getUserIncome(new Date())
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Income</h1>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={'"month" and "year"'}
              views={["month", "year"]}
              onChange={(newValue) => {
                console.log(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Outlet />
    </div>
  );
};

export default Income;
