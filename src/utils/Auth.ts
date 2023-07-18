import { AxiosResponse } from "axios";
import { ToastType } from "../Types";
import { setCookie } from "./Cookie";

/**
 * Function will be called onSucces of signup.
 * It will store the signUp token in cookie and redirect to Dashboard.
 * @param response - success response returned by the signup api.
 * @param setToastState - callback function to show toast on success of signup
 */
const onSigningUpSuccessfully = (
  response: AxiosResponse<any, any>,
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>
) => {
  if (response.status === 200) {
    setCookie("token", response.data.token);
    setToastState({
      isOpened: true,
      status: "success",
      message: "Account created successfully",
    });
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  }
};

/**
 * Function will be called onFailure of signup.
 * It will redirect to login if user already exists
 * @param err - error response retured by the signup api
 * @param setToastState - callback function to show toast on failure of signup
 */
const failureWhileSigningUp = (
  err: any,
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>
) => {
  const { response } = err;
  // if user already exists redirect to login after 2 seconds
  if (response?.status === 422) {
    setToastState({
      isOpened: true,
      status: "error",
      message: `${response?.data} Redirecting to login, Try to login.`,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } else {
    setToastState({
      isOpened: true,
      status: "error",
      message: response?.data ?? "Internal server error",
    });
  }
};

export { onSigningUpSuccessfully, failureWhileSigningUp };
