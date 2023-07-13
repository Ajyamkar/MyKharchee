import React from "react";
import { Outlet } from "react-router-dom";
import AddExpensesDrawer from "./AddExpensesDrawer/AddExpensesDrawer";
import Navbar from "./TopAppBar/Navbar";

/**
 * Component to render routes other than authentication routes.
 */
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <AddExpensesDrawer />
    </>
  );
};

export default Layout;
