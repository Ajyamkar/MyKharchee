import React from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Toast from "./components/Toast";
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

  return (
    <ToastContext.Provider value={{ setToastState }}>
      <div className="app">
        <AppRoutes />

        <Toast toastState={toastState} closeToast={closeToast} />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
