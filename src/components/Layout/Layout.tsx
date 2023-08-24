import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
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

  return (
    <>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>

      <IconButton className="addExpensesDrawer-button">
        <Link to={`${window.location.pathname}/addExpenses`}>
          <AddCircleIcon className="addExpensesDrawer-icon" />
        </Link>
      </IconButton>
    </>
  );
};

export default Layout;
