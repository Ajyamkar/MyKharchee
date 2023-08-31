import React, { createContext } from "react";
import { ToastType } from "../Types";

interface ToastContextType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
  toastState: ToastType;
}

/**
 * Created the context for showing toast throughout the application whenever needed,
 * which populates toastState and its setter function.
 */
const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export default ToastContext;
