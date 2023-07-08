import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import AddExpensesDrawer from "./components/AddExpensesDrawer/AddExpensesDrawer";
import Analytics from "./components/Analytics/Analytics";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/TopAppBar/Navbar";
import { ToastType } from "./Types";

function App() {
  /**
   * State to open or close snackbar.
   */
  const [toastState, setToastState] = React.useState<ToastType>({
    isOpened: false,
    status: "success",
    message: "",
  });

  /**
   * Function to close toast.
   */
  const closeToast = () => {
    setToastState({ ...toastState, isOpened: false });
  };

  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={<Signup setToastState={setToastState} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Snackbar
        open={toastState.isOpened}
        autoHideDuration={2000}
        onClose={closeToast}
      >
        <Alert
          severity={toastState.status}
          onClose={closeToast}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <AddExpensesDrawer />
    </>
  );
}

export default App;
