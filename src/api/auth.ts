import instance from "../instance";
import { getCookie } from "../utils/Cookie";
import { loginDataType, signupDataType, updatePasswordDataType } from "./Types";

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
  const token = getCookie("token");
  const response = await instance({
    url: "/api/auth/isUserLoggedIn",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
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
 * Api call to sign up the user with google
 * @param data - data i.e code returned by google in redirect url.
 */
const googleSignUpApi = async (data: { code: string }) => {
  const response = await instance({
    url: "/api/auth/googleSignUp",
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
  googleSignUpApi,
};
