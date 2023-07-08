import Cookies from "universal-cookie";
import instance from "../instance";
import { signupDataType } from "./Types";

/**
 * Api call to register the user.
 * @param data - data required to register the user.
 */
const registerUser = async (data: signupDataType) => {
  const response = await instance({
    url: "api/signup/",
    method: "POST",
    data,
  });
  return response;
};

/**
 * Api call to check if the user is logged in or not.
 */
const isUserLoggedIn = async () => {
  const token = new Cookies().get("token");
  const response = await instance({
    url: "api/isUserLoggedIn",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { registerUser, isUserLoggedIn };
