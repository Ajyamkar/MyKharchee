import Cookies from "universal-cookie";
const cookie = new Cookies();

/**
 * Max age of a cookie i.e cookie will available for 24hrs.
 */
const COOKIE_MAX_AGE = 60 * 60 * 24;

/**
 * Max age of a cookie when user clicks remember me while loggingIn.
 * i.e cookie will available for 5 days.
 */
const COOKIE_EXTENDED_MAX_AGE = 60 * 60 * 24 * 5;

/**
 * Function to store data in cookie.
 * @param key - name of the field to be stored in the cookie.
 * @param value - value of the corresponding field to be stored in the cookie.
 * @param extended - (optional) will be true when user click remember me while loggingIn.
 */
const setCookie = (key: string, value: any, extended = false) => {
  cookie.set(key, value, {
    maxAge: extended ? COOKIE_EXTENDED_MAX_AGE : COOKIE_MAX_AGE,
  });
};

/**
 * Function to retrive data stored in the cookie.
 * @param key - name of the field stored in the cookie.
 * @returns value of the corresponding field to be stored in the cookie.
 */
const getCookie = (key: string): string => {
  return cookie.get(key);
};

/**
 * Function to delete a cookie
 * @param key - key to be deleted.
 */
const destroyCookie = (key: string) => {
  cookie.remove(key);
};

export { setCookie, getCookie, destroyCookie };
