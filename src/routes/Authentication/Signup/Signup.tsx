import React from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { isUserLoggedInApi, registerUserApi } from "../../../api/auth";
import { ToastType } from "../../../Types";
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

interface SignupPropsType {
  setToastState: React.Dispatch<React.SetStateAction<ToastType>>;
}

interface SignupValidationErrorType {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

/**
 * Component to render Signup page.
 * @param props.setToastState - function to show toast on success/failure of signup.
 */
const Signup = (props: SignupPropsType) => {
  /**
   * State to keep track of user's first name.
   */
  const [firstName, setFirstName] = React.useState("");

  /**
   * State to keep track of user's last name.
   */
  const [lastName, setLastName] = React.useState("");

  /**
   * State to keep track of user's email address.
   */
  const { email, addEmail } = useEmail();

  /**
   * State to keep track of user's password.
   */
  const { password, addPassword } = usePassword();

  /**
   * State to show errors for respective user fields.
   */
  const { validationError, addValidationError } =
    useValidationError<SignupValidationErrorType>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

  /**
   * Checks if the user is loggedIn or no, if loggedin redirects to dashboard route.
   * So that user can't access signup page if user is already loggedIn.
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
   * State to show/hide password.
   */
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Create account button will be enabled if all the fields valid values are added.
   */
  const isCreateButtonDisabled =
    firstName && lastName && email && !validationError.email && password
      ? false
      : true;

  /**
   * Function to create new user.
   * OnSuccess - will store the signUp token in cookie and redirect to Dashboard.
   * OnFailure - will redirect to login if user already exists
   */
  const createUser = () => {
    registerUserApi({
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        onSuccessWhileAuthenticating(response, props.setToastState);
      })
      .catch((err) => {
        onfailureWhileAuthenticating(err, props.setToastState);
      });
  };

  /**
   * Functione to get google signup url from backend.
   * OnSuccess - will redirect to google signUp url.
   */
  const getGoogleAuthUrl = () => {
    googleAuthUrl(props.setToastState);
  };

  return (
    <div className="signup display-flex justify-content-center align-items-center">
      <div>
        <h1 className="font-size-large">Get started absolutely free</h1>
        <p className="color-info">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <div className="display-flex justify-content-space-between mt-1 pt-1">
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

        <Divider className="mt-1 pb-1 bold">OR</Divider>

        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            value={firstName}
            className="first-name"
            label="First name"
            fullWidth
            required
            error={validationError.firstName ? true : false}
            helperText={validationError.firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              addValidationError({ ...validationError, firstName: "" });
            }}
            onBlur={() => {
              addValidationError({
                ...validationError,
                firstName: !firstName ? "First name is required" : "",
              });
            }}
          />
          <TextField
            value={lastName}
            className="last-name mt-1"
            label="Last name"
            fullWidth
            required
            error={validationError.lastName ? true : false}
            helperText={validationError.lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              addValidationError({ ...validationError, lastName: "" });
            }}
            onBlur={() => {
              addValidationError({
                ...validationError,
                lastName: !lastName ? "Last name is required" : "",
              });
            }}
          />
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
          <Button
            disabled={isCreateButtonDisabled}
            className="mt-1 bold font-size-large"
            type="submit"
            variant="contained"
            onClick={createUser}
            fullWidth
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
