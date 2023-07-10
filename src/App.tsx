import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import AddExpensesDrawer from "./components/AddExpensesDrawer/AddExpensesDrawer";
import Analytics from "./routes/Analytics/Analytics";
import Dashboard from "./routes/Dashboard/Dashboard";
import Expenses from "./routes/Expenses/Expenses";
import LandingPage from "./routes/LandingPage/LandingPage";
import Login from "./routes/Authentication/Login/Login";
import PageNotFound from "./routes/PageNotFound/PageNotFound";
import Profile from "./routes/Profile/Profile";
import Signup from "./routes/Authentication/Signup/Signup";
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
        <Route
          path="/login"
          element={<Login setToastState={setToastState} />}
        />
        <Route
          path="/signup"
          element={<Signup setToastState={setToastState} />}
        />
        <Route path="/" element={<LandingPage />} />
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
