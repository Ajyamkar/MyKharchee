import instance from "../instance";
import { getCookie } from "../utils/Cookie";
import { loginDataType, signupDataType, updatePasswordDataType } from "./Types";

/**
 * Api call to register the user.
 * @param data - data required to register the user.
 */
const registerUserApi = async (data: signupDataType) => {
  const response = await instance({
    url: "api/signup/",
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
    url: "api/login",
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
    url: "api/updatePassword",
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
    url: "api/isUserLoggedIn",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export {
  registerUserApi,
  loginUserApi,
  updateUserPasswordApi,
  isUserLoggedInApi,
};
