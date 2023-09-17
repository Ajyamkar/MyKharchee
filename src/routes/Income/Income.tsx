import React from "react";
import { Outlet } from "react-router-dom";

const Income = () => {
  return (
    <div>
      <h1>Income</h1>
      <Outlet />
    </div>
  );
};

export default Income;
