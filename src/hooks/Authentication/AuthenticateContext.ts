import { createContext } from "react";

interface AuthenticateContextType {
  isUserLoggedIn: null | boolean;
}

/**
 * Context for user authentication.
 */
const AuthenticateContext = createContext<AuthenticateContextType>({
  isUserLoggedIn: null,
});

export default AuthenticateContext;
