import React, { createContext } from "react";
import { ToastType } from "../Types";

interface ToastContextType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
}

/**
 * Created the context for showing toast throughout the application whenever needed,
 * which populates toast setter function.
 */
const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export default ToastContext;
