import React from "react";
import { Outlet } from "react-router-dom";
import "./Analytics.scss";

const Analytics = () => {
  return (
    <>
      <div>
        <h1>Analytics</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Analytics;
