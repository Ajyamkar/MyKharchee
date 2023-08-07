import instance from "../instance";
import { getUserAuthorizationToken } from "../utils/Cookie";
import {
  authenticateWithGoogleDataType,
  loginDataType,
  signupDataType,
  updatePasswordDataType,
} from "./Types";

/**
 * Api call to register the user.
 * @param data - data required to register the user.
 */
const registerUserApi = async (data: signupDataType) => {
  const response = await instance({
    url: "/api/auth/signup/",
    method: "POST",
    data,
  });
  return response;
};

/**
 * Api call to login the user
 * @param data - data required to login the user
 * @returns
 */
const loginUserApi = async (data: loginDataType) => {
  const response = await instance({
    url: "/api/auth/login",
    method: "POST",
    data,
  });
  return response;
};

/**
 * Api call to update the user's password.
 * @param data - data required to update the user's password.
 */
const updateUserPasswordApi = async (data: updatePasswordDataType) => {
  const response = await instance({
    url: "/api/auth/updatePassword",
    method: "PUT",
    data,
  });
  return response;
};

/**
 * Api call to check if the user is logged in or not.
 */
const isUserLoggedInApi = async () => {
  const response = await instance({
    url: "/api/auth/isUserLoggedIn",
    method: "GET",
    headers: {
      authorization: getUserAuthorizationToken(),
    },
  });
  return response;
};

/**
 * Api call to get google signup url.
 */
const getGoogleAuthUrlApi = async () => {
  const response = await instance({
    url: "/api/auth/getGoogleAuthUrl",
    method: "GET",
  });
  return response;
};

/**
 * Api call to signUp or signIn the user with google
 * @param data - data i.e code returned by google in redirect url &
 *               forLogin boolean to indicate whether to authenticate for google login.
 */
const authenticateWithGoogleApi = async (
  data: authenticateWithGoogleDataType
) => {
  const response = await instance({
    url: "/api/auth//authenticateWithGoogle",
    method: "POST",
    data,
  });
  return response;
};

export {
  registerUserApi,
  loginUserApi,
  updateUserPasswordApi,
  isUserLoggedInApi,
  getGoogleAuthUrlApi,
  authenticateWithGoogleApi,
};
