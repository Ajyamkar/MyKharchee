import { createContext } from "react";

/**
 * Context for user authentication.
 */
const AuthenticateContext = createContext({ isUserLoggedIn: false });

export default AuthenticateContext;
