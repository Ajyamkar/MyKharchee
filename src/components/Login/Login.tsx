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

interface LoginValidationErrorType {
  email: string | undefined;
  password: string | undefined;
}

/**
 * Regex to validate email address.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
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
   * Create account button will be enabled if all the fields valid values are added.
   */
  const isLoginButtonDisabled = (): boolean => {
    return email && !validationError.email && password ? false : true;
  };

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

            <Link to={"/forget-password"} className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <Button
            disabled={isLoginButtonDisabled()}
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
