import React from "react";
import { authenticateWithGoogleApi } from "../../api/auth";
import { ToastType } from "../../Types";
import {
  onfailureWhileAuthenticating,
  onSuccessWhileAuthenticating,
} from "../../utils/Auth";
import { destroyCookie, getCookie } from "../../utils/Cookie";

interface GoogleOAuthRedirectPropsType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
}

/**
 * Transition component.
 * It will be called by google while performing the oauth to exchange the code.
 * OnSuccess - will store the signUp token in cookie and redirect to Dashboard.
 * OnFailure - will redirect to login if there is failure while signing up
 * @param props.setToastState - function to show toast on success/failure while signing up
 *
 */
const GoogleOAuthRedirect = (props: GoogleOAuthRedirectPropsType) => {
  /**
   * This is used to access the code from query param of redirect url and send code to
   * backend api to authenticate with google. Along with code we send forLogin boolean to
   * authenticate for login flow or signup flow. As we have single api endpoint for google
   * login and signup.
   */
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const forLogin = getCookie("forLogin") ? true : false;

    if (code) {
      authenticateWithGoogleApi({ code, forLogin })
        .then((response) => {
          destroyCookie("forLogin");
          onSuccessWhileAuthenticating(response, props.setToastState);
        })
        .catch((err) => {
          destroyCookie("forLogin");
          onfailureWhileAuthenticating(err, props.setToastState, forLogin);
        });
    } else {
      props.setToastState({
        isOpened: true,
        status: "error",
        message: "Something went wrong redirecting to signup",
      });

      setTimeout(() => {
        window.location.href = "/signup";
      }, 2000);
    }
  }, []);
  return <div></div>;
};

export default GoogleOAuthRedirect;
