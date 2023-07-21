import { AxiosResponse } from "axios";
import { getGoogleAuthUrlApi } from "../api/auth";
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
      message: response.data.message,
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

/**
 * Functione to get google signIn url from backend.
 * OnSuccess - will redirect to google login url.
 *
 * @param setToastState - callback function to show toast if error occurs.
 * @param forLogin - indicates whether is it for google login if true cookiee with {ForLogin=true} is created
 */
const googleAuthUrl = (
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>,
  forLogin = false
) => {
  getGoogleAuthUrlApi()
    .then((response) => {
      if (forLogin) {
        /**
         * Cookie with forLogin is created and it will be destroyed once loginIn/signup is completed
         * We are using this cookie value when google server responds with code in Google Redirect url i.e /googleRedirect
         * we send this cookie value to backend api to indicate its for login flow, as we have a common api endpoint for
         * logingIn & signingUp with google.
         * It's usage can be found in GoogleOAuthRedirect.tsx
         */
        setCookie("forLogin", true);
      }
      window.location.href = response.data;
    })
    .catch((error) => {
      setToastState({
        isOpened: true,
        status: "error",
        message: "Something went wrong",
      });
    });
};

export { onSigningUpSuccessfully, failureWhileSigningUp, googleAuthUrl };
