import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { updateUserPasswordApi } from "../../../api/auth";
import { ToastType } from "../../../Types";
import { setCookie } from "../../../utils/Cookie";
import { EMAIL_REGEX } from "../Constants";
import "./ForgotPassword.scss";

interface ForgotPasswordPropsType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
}

interface ForgotPasswordValidationErrorType {
  email: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
}

type passwordsFieldsArrayType = Array<{
  id: string;
  label: string;
  stateName: "newPassword" | "confirmPassword";
  stateValue: string;
  setStateFunction: React.Dispatch<React.SetStateAction<string>>;
}>;

/**
 * Component to render Forgot password page.
 * @param props.setToastState - function to show toast on success/failure of updating the user password.
 */
const ForgotPassword = (props: ForgotPasswordPropsType) => {
  /**
   * State to keep track of user's email address.
   */
  const [email, setEmail] = React.useState("");

  /**
   * State to keep track of user's new password.
   */
  const [newPassword, setNewPassword] = React.useState("");

  /**
   * State to keep track of confirm new password field.
   */
  const [confirmPassword, setConfirmPassword] = React.useState("");

  /**
   * State to show/hide password.
   */
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * State to show errors for respective user fields.
   */
  const [validationError, setValidationError] =
    React.useState<ForgotPasswordValidationErrorType>({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

  /**
   * Created this array to increase the reusability of password related mui-components.
   */
  const passwordFieldsArray: passwordsFieldsArrayType = [
    {
      id: "new-password",
      label: "New password",
      stateName: "newPassword",
      stateValue: newPassword,
      setStateFunction: setNewPassword,
    },
    {
      id: "confirm-password",
      label: "Confirm password",
      stateName: "confirmPassword",
      stateValue: confirmPassword,
      setStateFunction: setConfirmPassword,
    },
  ];

  /**
   * Update password button will be enabled if all the fields valid values are added.
   */
  const isUpdateButtonDisabled =
    email && !validationError.email && newPassword && confirmPassword
      ? false
      : true;

  /**
   * Function to throw error if email is missing or invalid email address.
   * @param value - email address of the user.
   */
  const setEmailValidationError = (value: string) => {
    let err = "";
    if (!value) {
      err = "Email address is required";
    } else if (!EMAIL_REGEX.test(value)) {
      err = "Enter a valid email address";
    }
    setValidationError({ ...validationError, email: err });
  };

  /**
   * Function to update the user's new password.
   * OnSuccess - will store the signIn token in cookie and redirect to Dashboard.
   * OnFailure - will redirect to signup if user doesn't have an account.
   */
  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      props.setToastState({
        isOpened: true,
        status: "error",
        message: "Confirm password should match with password.",
      });
      return;
    }
    try {
      const response = await updateUserPasswordApi({
        email,
        updatedPassword: confirmPassword,
      });
      setCookie("token", response.data.token);
      props.setToastState({
        isOpened: true,
        status: "success",
        message: "Successfully updated the password.",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error: any) {
      let errMessage = error.response?.data ?? "Internal server error.";
      // if user doesn't exists it will be redirected to signup page.
      if (error.response?.status === 404) {
        errMessage = `${error.response?.data}. Redirecting to signup, Try to signup`;
        setTimeout(() => {
          window.location.href = "/signup";
        }, 2000);
      }
      props.setToastState({
        isOpened: true,
        status: "error",
        message: errMessage,
      });
    }
  };

  return (
    <div className="forgot-password display-flex justify-content-center align-items-center">
      <div>
        <div className="font-size-large">
          <h1 className="m0">Forgot</h1>
          <h1 className="m0">Password?</h1>
        </div>
        <p>Enter the email associated with your account</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            value={email}
            className="email mt-1"
            label="Email address"
            fullWidth
            required
            error={validationError.email ? true : false}
            helperText={validationError.email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValidationError(e.target.value);
            }}
            onBlur={() => {
              setEmailValidationError(email);
            }}
          />

          {passwordFieldsArray.map((field, index) => {
            return (
              <FormControl
                key={index}
                error={validationError[field.stateName] ? true : false}
                className="password mt-1"
                fullWidth
                required
                variant="outlined"
              >
                <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                <OutlinedInput
                  id={field.id}
                  value={field.stateValue}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    field.setStateFunction(e.target.value);
                    setValidationError({
                      ...validationError,
                      [field.stateName]: "",
                    });
                  }}
                  onBlur={() => {
                    setValidationError({
                      ...validationError,
                      [field.stateName]: !field.stateValue
                        ? `${field.label} is required`
                        : "",
                    });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={field.label}
                />
                <FormHelperText>
                  {validationError[field.stateName]}
                </FormHelperText>
              </FormControl>
            );
          })}

          <Button
            onClick={updatePassword}
            disabled={isUpdateButtonDisabled}
            className="mt-1 font-size-large"
            variant="contained"
            type="submit"
            fullWidth
          >
            Update Password
          </Button>

          <p className="text-align-center">
            <Link to="/login" className="text-decoration-none">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
