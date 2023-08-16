import React, { useEffect } from "react";
import { isUserLoggedInApi } from "./api/auth";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Toast from "./components/Toast";
import AuthenticateContext from "./hooks/Authentication/AuthenticateContext";
import ToastContext from "./hooks/ToastContext";
import { ToastType } from "./Types";

function App() {
  /**
   * State to open or close toast.
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

  /**
   * State to check whether user is loggedin or not.
   */
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<null | boolean>(
    null
  );

  /**
   * Authenticate whether user is loggedIn or not.
   */
  useEffect(() => {
    isUserLoggedInApi()
      .then(() => {
        setIsUserLoggedIn(true);
      })
      .catch(() => {
        setIsUserLoggedIn(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastContext.Provider value={{ setToastState }}>
      <div className="app">
        <AuthenticateContext.Provider value={{ isUserLoggedIn }}>
          <AppRoutes />
        </AuthenticateContext.Provider>

        <Toast toastState={toastState} closeToast={closeToast} />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
