import Cookies from "universal-cookie";
const cookie = new Cookies();

/**
 * Max age of a cookie i.e cookie will available for 2 mins.
 */
const COOKIE_MAX_AGE = 60 * 2;

/**
 * Function to store data in cookie.
 * @param propertyName - name of the field to be stored in the cookie.
 * @param propertyValue - value of the corresponding field to be stored in the cookie.
 */
const setCookie = (propertyName: string, propertyValue: any) => {
  cookie.set(propertyName, propertyValue, {
    maxAge: COOKIE_MAX_AGE,
  });
};

/**
 * Function to retrive data stored in the cookie.
 * @param propertyName - name of the field stored in the cookie.
 * @returns value of the corresponding field to be stored in the cookie.
 */
const getCookie = (propertyName: string): string => {
  return cookie.get(propertyName);
};

export { setCookie, getCookie };
