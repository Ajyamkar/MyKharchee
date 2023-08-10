import React from "react";

/**
 * Custom hook to keep track of user's password.
 */
const usePassword = () => {
  const [password, setPassword] = React.useState("");

  const addPassword = (value: string) => {
    setPassword(value);
  };

  return {
    password,
    addPassword,
  };
};

export default usePassword;
