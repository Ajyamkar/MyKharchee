import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import {
  Facebook,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
import { ToastType } from "../../../Types";
import { isUserLoggedInApi, loginUserApi } from "../../../api/auth";
import { setCookie } from "../../../utils/Cookie";
import { EMAIL_REGEX } from "../Constants";

interface LoginPropsType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
}

interface LoginValidationErrorType {
  email: string | undefined;
  password: string | undefined;
}

/**
 * Component to render Login page.
 * @param props.setToastState - function to show toast on success/failure of login.
 */
const Login = (props: LoginPropsType) => {
  /**
   * State to keep track of user's email address.
   */
  const [email, setEmail] = React.useState("");

  /**
   * State to keep track of user's password.
   */
  const [password, setPassword] = React.useState("");

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
  const [validationError, setValidationError] =
    React.useState<LoginValidationErrorType>({
      email: "",
      password: "",
    });

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
   * Function to login the user.
   * OnSuccess - will store the signIn token in cookie and redirect to Dashboard.
   * OnFailure - will redirect to signup if user doesn't have account.
   */
  const signInUser = () => {
    loginUserApi({ email, password })
      .then((response) => {
        setCookie("token", response.data.token);
        props.setToastState({
          isOpened: true,
          status: "success",
          message: response.data.message,
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      })
      .catch((err) => {
        const { response } = err;
        // If user does not exists redirect to the signup page after 2 seconds.
        if (response?.status === 404) {
          props.setToastState({
            isOpened: true,
            status: "error",
            message: `${response?.data}. Redirecting to signup, Try to signup`,
          });
          setTimeout(() => {
            window.location.href = "/signup";
          }, 2000);
        } else {
          props.setToastState({
            isOpened: true,
            status: "error",
            message: response?.data ?? "Internal server error",
          });
        }
      });
  };

  return (
    <div className="login display-flex align-items-center">
      <div>
        <h1 className="font-size-large">Sign in to MyKharche</h1>

        <p className="color-info">
          Don't have an account? <Link to="/signup">Get started</Link>
        </p>

        <div className="display-flex justify-content-space-between pt-1 pb-1">
          <Button className="auth-btn">
            <Google className="google" fontSize="large" />
          </Button>
          <Button className="auth-btn">
            <Facebook className="facebook" fontSize="large" />
          </Button>
          <Button className="auth-btn">
            <Twitter className="twitter" fontSize="large" />
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
              setEmail(e.target.value);
              setEmailValidationError(e.target.value);
            }}
            onBlur={() => {
              setEmailValidationError(email);
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
                setPassword(e.target.value);
                setValidationError({ ...validationError, password: "" });
              }}
              onBlur={() => {
                setValidationError({
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
