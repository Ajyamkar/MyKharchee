import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthenticateContext from "../hooks/Authentication/AuthenticateContext";
import AddExpensesDrawer from "./AddExpensesDrawer/AddExpensesDrawer";
import Navbar from "./TopAppBar/Navbar";

/**
 * Component to render routes other than authentication routes.
 */
const Layout = () => {
  /**
   * boolean to check whether user is loggedin or not.
   */
  const { isUserLoggedIn } = React.useContext(AuthenticateContext);

  /**
   * Checks if the user is loggedIn or not,
   * if not loggedIn will redirect to login
   */
  useEffect(() => {
    if (!isUserLoggedIn && typeof isUserLoggedIn === "boolean") {
      window.location.href = "/login";
    }
  }, [isUserLoggedIn]);

  return (
    <>
      <Navbar />
      <Outlet />
      <AddExpensesDrawer />
    </>
  );
};

export default Layout;
