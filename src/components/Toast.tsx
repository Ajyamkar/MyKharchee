import { Alert, Snackbar } from "@mui/material";
import { ToastType } from "../Types";

interface ToastPropsType {
  toastState: ToastType;
  closeToast: () => void;
}

/**
 * Component to render toast.
 * @param toastState - State to open or close toast.
 * @param closeToast - callback function to close toast.
 * @returns
 */
const Toast = ({ toastState, closeToast }: ToastPropsType) => {
  return (
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
  );
};

export default Toast;
