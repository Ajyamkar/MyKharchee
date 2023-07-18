import React from "react";
import { googleSignUpApi } from "../../api/auth";
import { ToastType } from "../../Types";
import {
  failureWhileSigningUp,
  onSigningUpSuccessfully,
} from "../../utils/Auth";

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
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      googleSignUpApi({ code })
        .then((response) => {
          onSigningUpSuccessfully(response, props.setToastState);
        })
        .catch((err) => {
          failureWhileSigningUp(err, props.setToastState);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
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
  });
  return <div></div>;
};

export default GoogleOAuthRedirect;
