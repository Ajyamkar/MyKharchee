import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { isUserLoggedInApi, loginUserApi } from "../../../api/auth";
import {
  onfailureWhileAuthenticating,
  googleAuthUrl,
  onSuccessWhileAuthenticating,
  emailValidationError,
} from "../../../utils/Auth";
import googleIcon from "../../../assets/google-icon.png";
import useEmail from "../../../hooks/Authentication/useEmail";
import usePassword from "../../../hooks/Authentication/usePassword";
import useValidationError from "../../../hooks/Authentication/useValidationErrors";
import ToastContext from "../../../hooks/ToastContext";

interface LoginValidationErrorType {
  email: string | undefined;
  password: string | undefined;
}

/**
 * Component to render Login page.
 */
const Login = () => {
  /**
   * State to keep track of user's email address.
   */
  const { email, addEmail } = useEmail();

  /**
   * State to keep track of user's password.
   */
  const { password, addPassword } = usePassword();

  /**
   * State to show/hide password.
   */
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * State to check to whether remember me checkbox is checked or not.
   */
  const [isRememberMeChecked, setIsRememberMeChecked] = React.useState(false);

  /**
   * State to show errors for respective user fields.
   */
  const { validationError, addValidationError } =
    useValidationError<LoginValidationErrorType>({
      email: "",
      password: "",
    });

  /**
   * function to show toast on success/failure of login.
   */
  const { setToastState } = React.useContext(ToastContext);

  /**
   * Checks if the user is loggedIn or no, if loggedin redirects to dashboard route.
   * So that user can't access login page if user is already loggedIn.
   */
  React.useEffect(() => {
    isUserLoggedInApi()
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        return;
      });
  }, []);

  /**
   * Create account button will be enabled if all the fields valid values are added.
   */
  const isLoginButtonDisabled =
    email && !validationError.email && password ? false : true;

  /**
   * Function to login the user.
   * OnSuccess - will store the signIn token in cookie and redirect to Dashboard.
   * OnFailure - will redirect to signup if user doesn't have account.
   */
  const signInUser = () => {
    loginUserApi({ email, password })
      .then((response) => {
        onSuccessWhileAuthenticating(
          response,
          setToastState,
          isRememberMeChecked
        );
      })
      .catch((err) => {
        onfailureWhileAuthenticating(err, setToastState);
      });
  };

  /**
   * Functione to get google login url from backend.
   * OnSuccess - will redirect to google signIn url.
   */
  const getGoogleAuthUrl = () => {
    googleAuthUrl(setToastState, true);
  };

  return (
    <div className="login display-flex align-items-center">
      <div>
        <h1 className="font-size-large">Sign in to MyKharche</h1>

        <p className="color-info">
          Don't have an account? <Link to="/signup">Get started</Link>
        </p>

        <div className="display-flex justify-content-space-between pt-1 pb-1">
          <Button
            className="auth-btn bold font-size-large"
            onClick={getGoogleAuthUrl}
            fullWidth
          >
            <div className="display-flex justify-content-center">
              <img src={googleIcon} alt="google-icon" />
              <span className="color-info">Google</span>
            </div>
          </Button>
        </div>

        <Divider className="pt-1 pb-1 bold">OR</Divider>

        <form
          className="login-form"
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
          <FormControl
            error={validationError.password ? true : false}
            className="password mt-1"
            fullWidth
            required
            variant="outlined"
          >
            <InputLabel htmlFor="create-password">Password</InputLabel>
            <OutlinedInput
              id="create-password"
              value={password}
              type={showPassword ? "text" : "password"}
              error={validationError.password ? true : false}
              onChange={(e) => {
                addPassword(e.target.value);
                addValidationError({ ...validationError, password: "" });
              }}
              onBlur={() => {
                addValidationError({
                  ...validationError,
                  password: !password ? "Password is required" : "",
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
              label="Password"
            />
            <FormHelperText>{validationError.password}</FormHelperText>
          </FormControl>

          <div className="display-flex justify-content-space-between align-items-center">
            <FormControlLabel
              label="Remember me"
              control={
                <Checkbox
                  checked={isRememberMeChecked}
                  onChange={(e) => {
                    setIsRememberMeChecked(e.target.checked);
                  }}
                />
              }
            />

            <Link to={"/forgot-password"} className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <Button
            disabled={isLoginButtonDisabled}
            onClick={signInUser}
            className="mt-1 bold font-size-large"
            type="submit"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
