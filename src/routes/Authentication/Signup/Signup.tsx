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
import {
  Facebook,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  getGoogleAuthUrlApi,
  isUserLoggedInApi,
  registerUserApi,
} from "../../../api/auth";
import { ToastType } from "../../../Types";
import { EMAIL_REGEX } from "../Constants";
import {
  failureWhileSigningUp,
  onSigningUpSuccessfully,
} from "../../../utils/Auth";

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
  const [email, setEmail] = React.useState("");

  /**
   * State to keep track of user's password.
   */
  const [password, setPassword] = React.useState("");

  /**
   * State to show errors for respective user fields.
   */
  const [validationError, setValidationError] =
    React.useState<SignupValidationErrorType>({
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
        onSigningUpSuccessfully(response, props.setToastState);
      })
      .catch((err) => {
        failureWhileSigningUp(err, props.setToastState);
      });
  };

  /**
   * Functione to get google signup url from backend.
   * OnSuccess - will redirect to google signUp url.
   */
  const googleAuthUrl = () => {
    getGoogleAuthUrlApi()
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        props.setToastState({
          isOpened: true,
          status: "error",
          message: "Something went wrong",
        });
      });
  };

  return (
    <div className="signup display-flex justify-content-center align-items-center">
      <div>
        <h1 className="font-size-large">Get started absolutely free</h1>
        <p className="color-info">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

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
              setValidationError({ ...validationError, firstName: "" });
            }}
            onBlur={() => {
              setValidationError({
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
              setValidationError({ ...validationError, lastName: "" });
            }}
            onBlur={() => {
              setValidationError({
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

        <Divider className="mt-1">Sign up with</Divider>

        <div className="display-flex justify-content-space-between mt-1">
          <Button className="auth-btn" onClick={googleAuthUrl}>
            <Google className="google" fontSize="large" />
          </Button>
          <Button className="auth-btn">
            <Facebook className="facebook" fontSize="large" />
          </Button>
          <Button className="auth-btn">
            <Twitter className="twitter" fontSize="large" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
