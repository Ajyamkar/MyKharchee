import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthenticateContext from "../../hooks/Authentication/AuthenticateContext";
import Navbar from "../TopAppBar/Navbar";
import "./Layout.scss";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

  /**
   * To navigate to another route.
   */
  const navigate = useNavigate();

  /**
   * Onclicking add income button,
   * Will navigate to addIncome route if the current route is income route OR
   * Will navigate to addExpenses route
   */
  const route = () => {
    const { pathname } = window.location;
    let redirectTo = "addExpenses";
    if (pathname.includes("income")) {
      redirectTo = "addIncome";
    }
    return `${pathname}/${redirectTo}`;
  };

  return (
    <>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>

      <IconButton
        onClick={() => navigate(route())}
        className="addExpensesDrawer-button"
      >
        <AddCircleIcon className="addExpensesDrawer-icon" />
      </IconButton>
    </>
  );
};

export default Layout;
