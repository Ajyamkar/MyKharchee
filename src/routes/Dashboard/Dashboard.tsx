import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
