import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updateUserPasswordApi } from "../../../api/auth";
import usePassword from "../../../hooks/Authentication/usePassword";
import useEmail from "../../../hooks/Authentication/useEmail";
import "./ForgotPassword.scss";
import useValidationError from "../../../hooks/Authentication/useValidationErrors";
import {
  emailValidationError,
  onfailureWhileAuthenticating,
  onSuccessWhileAuthenticating,
} from "../../../utils/Auth";
import ToastContext from "../../../hooks/ToastContext";
import AuthenticateContext from "../../../hooks/Authentication/AuthenticateContext";
import useIntermediateStates from "../../../hooks/useIntermediateStates";

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
  setStateFunction: (password: string) => void;
}>;

/**
 * Component to render Forgot password page.
 */
const ForgotPassword = () => {
  /**
   * State to keep track of user's email address.
   */
  const { email, addEmail } = useEmail();

  /**
   * State to keep track of user's new password.
   */
  const { password: newPassword, addPassword } = usePassword();

  /**
   * State to keep track of confirm new password field.
   */
  const { password: confirmPassword, addPassword: addConfirmPassword } =
    usePassword();

  /**
   * State to show/hide password.
   */
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * State to show errors for respective user fields.
   */
  const { validationError, addValidationError } =
    useValidationError<ForgotPasswordValidationErrorType>({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

  /**
   * function to show toast on success/failure of updating the user password.
   */
  const { setToastState } = useContext(ToastContext);

  /**
   * Hook to manage intermediate states such as isfetching, isSaving etc.
   */
  const { intermediateState, setIntermediateState } = useIntermediateStates();

  /**
   * Created this array to increase the reusability of password related mui-components.
   */
  const passwordFieldsArray: passwordsFieldsArrayType = [
    {
      id: "new-password",
      label: "New password",
      stateName: "newPassword",
      stateValue: newPassword,
      setStateFunction: addPassword,
    },
    {
      id: "confirm-password",
      label: "Confirm password",
      stateName: "confirmPassword",
      stateValue: confirmPassword,
      setStateFunction: addConfirmPassword,
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
   * Function to update the user's new password.
   * OnSuccess - will store the signIn token in cookie and redirect to Dashboard.
   * OnFailure - will redirect to signup if user doesn't have an account.
   */
  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setToastState({
        isOpened: true,
        status: "error",
        message: "Confirm password should match with password.",
      });
      return;
    }
    setIntermediateState({ ...intermediateState, isSaving: true });
    try {
      const response = await updateUserPasswordApi({
        email,
        updatedPassword: confirmPassword,
      });
      onSuccessWhileAuthenticating(response, setToastState);
    } catch (error: any) {
      onfailureWhileAuthenticating(error, setToastState);
    } finally {
      setIntermediateState({ ...intermediateState, isSaving: false });
    }
  };

  /**
   * boolean to check whether user is loggedin or not.
   */
  const { isUserLoggedIn } = React.useContext(AuthenticateContext);

  /**
   * Checks if the user is loggedIn or no, if loggedin redirects to dashboard route.
   * So that user can't access forgot password page if user is already loggedIn.
   */
  React.useEffect(() => {
    if (isUserLoggedIn) {
      window.location.href = "/dashboard";
    }
  }, [isUserLoggedIn]);

  return (
    <div className="forgot-password display-flex justify-content-center align-items-center">
      {intermediateState.isSaving ? (
        <Box className="loading">
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <h1 className="font-size-large">Forgot Password?</h1>
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
                addEmail(e.target.value);
                addValidationError({
                  ...validationError,
                  email: emailValidationError(e.target.value),
                });
              }}
              onBlur={() => {
                addValidationError({
                  ...validationError,
                  email: emailValidationError(email),
                });
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
                      addValidationError({
                        ...validationError,
                        [field.stateName]: "",
                      });
                    }}
                    onBlur={() => {
                      addValidationError({
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
      )}
    </div>
  );
};

export default ForgotPassword;
